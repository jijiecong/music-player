import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 792116527,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function searchByKey (key, catZhida, page) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    g_tk: 792116527,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: key,
    zhidaqu: 1,
    catZhida: catZhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all'
  })

  return jsonp(url, data, options)
}
