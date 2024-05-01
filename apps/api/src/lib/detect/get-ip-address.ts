import requestIp from 'request-ip'
import { ApiRequest } from '../../routes/type'

export function getIpAddress(req: ApiRequest) {
  // Cloudflare
  if (req.headers['cf-connecting-ip']) {
    return req.headers['cf-connecting-ip'] as string
  }
  return requestIp.getClientIp(req)
}
