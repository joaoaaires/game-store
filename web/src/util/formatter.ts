export function formatterMessageErro(message: string | any): string {
  let messageFormatter = `${message}`
  messageFormatter = messageFormatter.replaceAll('Message:', '').trim()
  messageFormatter = messageFormatter.split('#').join(',')
  return messageFormatter
}
