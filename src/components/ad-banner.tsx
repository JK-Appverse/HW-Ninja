"use client";

import React from 'react';

const AdBanner = () => {
  return (
    <div className="flex items-center justify-center min-h-[100px] w-full bg-muted/50 rounded-lg border border-dashed my-8 p-4 text-center">
      {/* 
        ======================================================================
        === अपनी गूगल एडसेंस की स्क्रिप्ट यहाँ पेस्ट करें ===
        ======================================================================
        
        जब आपका गूगल एडसेंस अकाउंट अप्रूव हो जाए, तो वे आपको एक कोड देंगे।
        उस पूरे कोड को नीचे दिए गए उदाहरण की जगह पेस्ट कर दें।
        
        उदाहरण के लिए, आपका कोड कुछ ऐसा दिख सकता है:
        
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-your-client-id"
             crossOrigin="anonymous"></script>
        <ins class="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client="ca-pub-your-client-id"
             data-ad-slot="your-ad-slot-id"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        
        अभी के लिए, नीचे सिर्फ एक प्लेसहोल्डर टेक्स्ट है।
      */}
      <p className="text-muted-foreground text-sm">आपका विज्ञापन यहाँ दिखेगा</p>
    </div>
  );
};

export default AdBanner;
