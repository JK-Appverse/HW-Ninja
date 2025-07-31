"use client";

import React from 'react';

const AdBanner = () => {
  return (
    <div className="flex items-center justify-center h-24 w-full bg-muted/50 rounded-lg border border-dashed my-8">
      <p className="text-muted-foreground text-sm">Your Ad Banner Here</p>
      {/* 
        Replace this div with your ad code from Google AdSense or another provider.
        For example:
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
      */}
    </div>
  );
};

export default AdBanner;
