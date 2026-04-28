'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export function OpenWidgetScript() {
  const pathname = usePathname();

  // Don't show OpenWidget in the Sanity studio
  if (pathname.startsWith('/sanity')) {
    return null;
  }

  return (
    <>
      {/* OpenWidget chat widget - customize icon/theme in OpenWidget dashboard: Customize Style / Custom launcher */}
      <Script
        id="openwidget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.__ow = window.__ow || {};
            window.__ow.organizationId = "1656a350-4436-4c21-948c-ad73f0a203e6";
            window.__ow.integration_name = "manual_settings";
            window.__ow.product_name = "openwidget";
            (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
          `,
        }}
      />
      <noscript>
        You need to{" "}
        <a href="https://www.openwidget.com/enable-javascript" rel="noopener nofollow">
          enable JavaScript
        </a>{" "}
        to use the communication tool powered by{" "}
        <a href="https://www.openwidget.com/" rel="noopener nofollow" target="_blank">
          OpenWidget
        </a>
        .
      </noscript>
    </>
  );
}
