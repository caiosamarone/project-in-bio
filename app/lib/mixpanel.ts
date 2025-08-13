import Mixpanel from 'mixpanel'

const mixpanelEvent = Mixpanel.init('abac56da6bebc29049a9d5ac82a4cab5')

export function trackServerEvent(eventName: string, properties: any) {
  if (process.env.NODE_ENV === 'development') return
  mixpanelEvent.track(eventName, properties)
}
