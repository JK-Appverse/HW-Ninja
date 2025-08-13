
"use client";

import React, { useEffect, useState } from 'react';

const isNativeApp = () => {
  return typeof window !== "undefined" && (window as any).Capacitor?.isNativePlatform();
}

const AdBanner = () => {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(isNativeApp());
  }, []);


  const renderAdContent = () => {
    if (isNative) {
      return (
        <div className="flex items-center justify-center min-h-[100px] w-full bg-muted/50 rounded-lg border border-dashed my-8 p-4 text-center">
            {/* 
            ======================================================================
            === AdMob बैनर विज्ञापन के लिए                                      ===
            ======================================================================
            
            यह हिस्सा तब दिखेगा जब ऐप APK के रूप में चल रहा होगा।
            Capacitor AdMob प्लगइन का उपयोग करके आपको यहाँ विज्ञापन लोड और शो
            करने का कोड लिखना होगा।
            
            अभी के लिए, नीचे सिर्फ एक प्लेसहोल्डर टेक्स्ट है।
            */}
            <p className="text-muted-foreground text-sm">AdMob बैनर विज्ञापन यहाँ दिखेगा (ऐप के लिए)</p>
        </div>
      );
    }

    // जब वेबसाइट ब्राउज़र में चलेगी, तो AdSense ऑटो विज्ञापन अपने आप इस जगह को भर सकता है
    // या आप यहाँ एक खास AdSense विज्ञापन यूनिट कोड डाल सकते हैं।
    // For web, AdSense auto ads will fill this space.
    // This div is kept for structure but will be empty until ads are served.
    return <div className="min-h-[50px] w-full my-8"></div>;
  };
  
  return renderAdContent();
};

export default AdBanner;
