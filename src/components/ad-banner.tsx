
"use client";

import React from 'react';

const AdBanner = () => {
  return (
    <div className="flex items-center justify-center min-h-[100px] w-full bg-muted/50 rounded-lg border border-dashed my-8 p-4 text-center">
      {/* 
        ======================================================================
        === AdMob बैनर विज्ञापन के लिए                                      ===
        ======================================================================
        
        जब आप इस ऐप को Capacitor के साथ एक नेटिव ऐप में बदल देंगे, तो आपको
        AdMob प्लगइन का उपयोग करके यहाँ एक बैनर विज्ञापन दिखाना होगा।
        
        यह `page.tsx` में दिए गए Interstitial/Rewarded विज्ञापनों से अलग है।
        बैनर विज्ञापन आमतौर पर पेज के एक हिस्से में हमेशा दिखाई देते हैं।
        
        Capacitor AdMob प्लगइन का उपयोग करके आपको यहाँ विज्ञापन लोड और शो
        करने का कोड लिखना होगा।
        
        अभी के लिए, नीचे सिर्फ एक प्लेसहोल्डर टेक्स्ट है।
      */}
      <p className="text-muted-foreground text-sm">आपका AdMob बैनर विज्ञापन यहाँ दिखेगा</p>
    </div>
  );
};

export default AdBanner;

    