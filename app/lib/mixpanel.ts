import Mixpanel from 'mixpanel'

const mixpanelEvent = Mixpanel.init('e876bfbbca22f5d213a6579a279603b8')

export function trackServerEvent(eventName: string, properties: any) {
  if (process.env.NODE_ENV === 'development') return
  mixpanelEvent.track(eventName, properties)
}
