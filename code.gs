/**
 * GALERIA DO GRUPO ESCOTEIRO - Google Apps Script
 * Páginas:  .../exec            -> galeria pública
 *           .../exec?page=admin -> administração (protegida por senha)
 */
const SHEET_NAME = 'Albuns';
const HEADERS = ['id','ano','titulo','local','data','pastaId','capaId','fotos','visivel','criadoEm'];
const CACHE_SEG = 6 * 60 * 60; // 6h

/** RODE UMA VEZ no editor: cria o banco de dados e define a senha inicial do Admin */
function configurar() {
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty('ADMIN_PASSWORD')) p.setProperty('ADMIN_PASSWORD', 'admin123');
  sheet_();
  Logger.log('Pronto! Planilha: ' + SpreadsheetApp.openById(p.getProperty('SHEET_ID')).getUrl());
  Logger.log('Senha do admin: ' + p.getProperty('ADMIN_PASSWORD') + ' (altere em Configurações do projeto > Propriedades do script)');
}

function doGet(e) {
  const admin = String(e.parameter.page || '').toLowerCase() === 'admin';
  const t = HtmlService.createTemplateFromFile(admin ? 'Admin' : 'Gallery');
  t.baseUrl = ScriptApp.getService().getUrl();
  t.params = JSON.stringify({ album: e.parameter.album || '', foto: e.parameter.foto || '' })
    .replace(/</g, '\\u003c');
  return t.evaluate()
    .setTitle(admin ? 'Admin - Galeria' : 'Galeria de Fotos')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ---------- Banco de dados (Planilha) ---------- */
function sheet_() {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('SHEET_ID');
  let ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) {} }
  if (!ss) {
    ss = SpreadsheetApp.create('Galeria Escoteiros - Banco de dados');
    p.setProperty('SHEET_ID', ss.getId());
  }
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.getSheets()[0].setName(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('E:E').setNumberFormat('@'); // data como texto yyyy-mm-dd
  }
  return sh;
}

function lerAlbuns_() {
  const v = sheet_().getDataRange().getValues();
  const out = [];
  for (let i = 1; i < v.length; i++) {
    const o = {};
    HEADERS.forEach((h, j) => o[h] = v[i][j]);
    if (!o.id) continue;
    o.criadoEm = o.criadoEm instanceof Date ? o.criadoEm.toISOString() : String(o.criadoEm || '');
    if (o.data instanceof Date) o.data = Utilities.formatDate(o.data, 'America/Sao_Paulo', 'yyyy-MM-dd');
    o.data = String(o.data || '');
    o.ano = String(o.ano || (o.data ? o.data.slice(0, 4) : ''));
    o.visivel = !(o.visivel === false || String(o.visivel).toUpperCase() === 'FALSE');
    o.fotos = Number(o.fotos) || 0;
    out.push(o);
  }
  return out;
}

function parseId_(txt) {
  txt = String(txt || '').trim();
  const m = txt.match(/(?:folders\/|[?&]id=|\/d\/)([-\w]{15,})/);
  if (m) return m[1];
  return /^[-\w]{15,}$/.test(txt) ? txt : '';
}

/* ---------- Fotos do Drive ---------- */
function listarFotos_(pastaId, forcar) {
  const cache = CacheService.getScriptCache();
  const key = 'midia_' + pastaId;
  if (!forcar) {
    const c = cache.get(key);
    if (c) return JSON.parse(c);
  }
  const fotos = [];
  let token = null;
  do {
    const r = Drive.Files.list({
      q: "'" + pastaId + "' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed=false",
      fields: 'nextPageToken, items(id,title,mimeType,createdDate,imageMediaMetadata/date)',
      maxResults: 1000,
      pageToken: token,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });
    (r.items || []).forEach(f => {
      const ts = f.imageMediaMetadata && f.imageMediaMetadata.date
        ? f.imageMediaMetadata.date.replace(/^(\d{4}):(\d\d):(\d\d)/, '$1-$2-$3').replace(' ', 'T')
        : f.createdDate;
      const isVideo = String(f.mimeType).indexOf('video/') === 0 ? 1 : 0;
      fotos.push([f.id, f.title, ts, isVideo]);
    });
    token = r.nextPageToken;
  } while (token);
  fotos.sort((a, b) => (a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : a[1].localeCompare(b[1])));
  try { cache.put(key, JSON.stringify(fotos), CACHE_SEG); } catch (e) {}
  return fotos;
}

/* ---------- API pública ---------- */
function getAlbuns() {
  return lerAlbuns_().filter(a => a.visivel).map(a => ({
    id: a.id, ano: a.ano, titulo: a.titulo, local: a.local, data: a.data, capaId: a.capaId, fotos: a.fotos
  }));
}

function getFotos(albumId) {
  const a = lerAlbuns_().find(x => x.id === albumId && x.visivel);
  if (!a) throw new Error('Álbum não encontrado');
  return {
    album: { id: a.id, ano: a.ano, titulo: a.titulo, local: a.local, data: a.data, capaId: a.capaId },
    fotos: listarFotos_(a.pastaId)
  };
}

/* ---------- API do Admin ---------- */
function auth_(pwd) {
  const real = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!real || String(pwd) !== real) throw new Error('Senha incorreta');
}

function adminLogin(pwd) { auth_(pwd); return true; }

function adminListar(pwd) { auth_(pwd); return lerAlbuns_(); }

function adminSalvar(pwd, a) {
  auth_(pwd);
  const pastaId = parseId_(a.pasta);
  if (!pastaId) throw new Error('Link da pasta do Drive inválido');
  if (!a.titulo) throw new Error('Informe o título');
  const fotos = listarFotos_(pastaId, true);
  let capaId = parseId_(a.capa) || (fotos[0] ? fotos[0][0] : '');
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  const id = a.id || Utilities.getUuid().slice(0, 8);
  const data = String(a.data || '');
  const linha = [id, a.ano || data.slice(0, 4), a.titulo, a.local || '', data, pastaId, capaId,
                 fotos.length, a.visivel !== false, new Date()];
  let idx = -1;
  for (let i = 1; i < rows.length; i++) if (rows[i][0] === id) { idx = i + 1; break; }
  if (idx > 0) { linha[9] = rows[idx - 1][9]; sh.getRange(idx, 1, 1, HEADERS.length).setValues([linha]); }
  else sh.appendRow(linha);
  return { id: id, fotos: fotos.length };
}

function adminExcluir(pwd, id) {
  auth_(pwd);
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) if (rows[i][0] === id) { sh.deleteRow(i + 1); return true; }
  return false;
}

/** Recontar fotos / limpar cache (use quando adicionar fotos novas na pasta) */
function adminAtualizar(pwd, id) {
  auth_(pwd);
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (!id || rows[i][0] === id) {
      const f = listarFotos_(rows[i][5], true);
      sh.getRange(i + 1, 8).setValue(f.length);
      if (!rows[i][6] && f[0]) sh.getRange(i + 1, 7).setValue(f[0][0]);
    }
  }
  return true;
}
