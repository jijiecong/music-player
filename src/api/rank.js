/**
 * Created by Jiecong Ji on 2017/6/27.
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getPrivilegeList () {
  const url = 'http://127.0.0.1:8888/services/acl/api/getAllPrivilegeByUser/61'

  const data = Object.assign({}, commonParams, {
  })

  return jsonp(url, data, options)
}
