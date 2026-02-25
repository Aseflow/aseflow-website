// Google Analytics event tracking utilities
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: window.location.pathname,
      ...parameters
    });
  }
};

// Specific event tracking functions
export const trackPreOrderClick = (source: string = 'unknown') => {
  trackEvent('preorder_click', {
    event_category: 'conversion',
    source: source,
    value: 1
  });
};

export const trackEarlyAccessSubmit = (email: string) => {
  trackEvent('early_access_submit', {
    event_category: 'lead_generation',
    method: 'popup_form',
    value: 1
  });
};

export const trackNewsletterSubmit = (source: string = 'newsletter') => {
  trackEvent('newsletter_submit', {
    event_category: 'lead_generation',
    method: source,
    value: 1
  });
};

export const trackContactSubmit = (subject: string) => {
  trackEvent('contact_submit', {
    event_category: 'support',
    subject_category: subject,
    value: 1
  });
};

export const trackSocialClick = (platform: string, url: string) => {
  trackEvent('social_click', {
    event_category: 'social_engagement',
    platform: platform,
    destination: url,
    value: 1
  });
};

// Track page views with UTM parameters
export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    const pageViewData: any = {
      page_path: path,
      page_title: document.title
    };
    
    // Add UTM parameters if they exist
    if (utmSource) pageViewData.campaign_source = utmSource;
    if (utmMedium) pageViewData.campaign_medium = utmMedium;
    if (utmCampaign) pageViewData.campaign_name = utmCampaign;
    
    window.gtag('config', 'G-D9KRK38FY1', pageViewData);
    
    if (utmSource || utmMedium || utmCampaign) {
      // UTM parameters are tracked via GA config above
    }
  }
};