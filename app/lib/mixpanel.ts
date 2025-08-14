import Mixpanel from 'mixpanel'

const mixPanelToken = process.env.MIX_PANEL_TOKEN!

const mixpanelEvent = Mixpanel.init(mixPanelToken)

export function trackServerEvent(eventName: string, properties: any) {
  if (process.env.NODE_ENV === 'development') return
  mixpanelEvent.track(eventName, properties)
}
