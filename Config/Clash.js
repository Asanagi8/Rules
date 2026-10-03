// 常量定义
const test_interval = 600;
const test_tolerance = 50;
const groupBaseOption = {
  "interval": 600,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 1,
  "hidden": false
};

// 添加地区分组
const regionConfig = [
  {
      name: "🇭🇰 香港 📶",
      matcher: "香港|🇭🇰|HK|Hong Kong|HongKong",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
  },
  {
      name: "🇹🇼 台湾 📶",
      matcher: "台湾|🇹🇼|tw|taiwan|tai wan",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
  },
  {
      name: "🇯🇵 日本 📶",
      matcher: "日本|🇯🇵|JP|Japan",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
  },
  {
      name: "🇰🇷 韩国 📶",
      matcher: "韩|🇰🇷|kr|korea",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"
  },
  {
      name: "🇸🇬 新加坡 📶",
      matcher: "新加坡|🇸🇬|SG|狮城|Singapore",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
  },
  {
      name: "🇺🇸 美国 📶",
      matcher: "美国|🇺🇸|US|United States|America",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
  },
  {
      name: "🌐 其他 📶",
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
  }
];

// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH
];

// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // CloudflareDNS
  "https://8.8.8.8/dns-query", // GoogleDNS  
];

// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    
    // 本地主机/设备
    "+.lan",
    "+.local",
    
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    
      // 追加以下条目
    "+.in-addr.arpa", 
    "+.ip6.arpa",
    "time.*.com",
    "time.*.gov",
    "pool.ntp.org",
    
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
    
  ],
  
  "default-nameserver": ["223.5.5.5","119.29.29.29"],//可修改成自己ISP的DNS
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver":[...domesticNameservers],
  "nameserver-policy": {
    "ruleset:Lan_Do_Resolve": domesticNameservers,
    "geosite:cn": domesticNameservers
  }
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

// 规则集配置
const ruleProviders = {
  "GlobalDNS_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/GlobalDNS/GlobalDNS_Domain.yaml",
    "path": "./ruleset/GlobalDNS_Domain.yaml"
  },
  "GlobalDNS_IP": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/GlobalDNS/GlobalDNS_IP.yaml",
    "path": "./ruleset/GlobalDNS_IP.yaml"
  },
  "ChinaDNS_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/ChinaDNS/ChinaDNS_Domain.yaml",
    "path": "./ruleset/ChinaDNS_Domain.yaml"
  },
  "ChinaDNS_IP": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/ChinaDNS/ChinaDNS_IP.yaml",
    "path": "./ruleset/ChinaDNS_IP.yaml"
  },
  "Lan_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Lan/Lan.yaml",
    "path": "./ruleset/Lan_Do_Resolve.yaml"
  },
  "BlockHttpDNS_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlockHttpDNS/BlockHttpDNS.yaml",
    "path": "./ruleset/BlockHttpDNS_Do_Resolve.yaml"
  },
  "Hijacking_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Hijacking/Hijacking.yaml",
    "path": "./ruleset/Hijacking_Do_Resolve.yaml"
  },
  "HijackingPlus_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/HijackingPlus/HijackingPlus.yaml",
    "path": "./ruleset/HijackingPlus_Do_Resolve.yaml"
  },
  "PreRepairEasyPrivacy_REJECT_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/PreRepairEasyPrivacy/PreRepairEasyPrivacy_REJECT.yaml",
    "path": "./ruleset/PreRepairEasyPrivacy_REJECT_Do_Resolve.yaml"
  },
  "my-Emby": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/Asanagi8/Rules/main/Ruleset/Emby.yaml",
    "path": "./ruleset/Asanagi8/my-Emby.yaml"  
  }, 
  "GeositeCN_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/GeositeCN/GeositeCN_Domain.yaml",
    "path": "./ruleset/GeositeCN_Domain.yaml"
  },
  "CloudflareCN_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Cloudflarecn/Cloudflarecn.yaml",
    "path": "./ruleset/CloudflareCN_Do_Resolve.yaml"
  },
  "OpenAI_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/OpenAI_Do_Resolve.yaml"    
  },
  "Gemini_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Gemini/Gemini_Domain.yaml",
    "path": "./ruleset/Gemini_Domain.yaml"    
  },
  "Claude_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/Claude_Do_Resolve.yaml"
  },
  "Copilot_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Copilot/Copilot_Domain.yaml",
    "path": "./ruleset/Copilot_Domain.yaml"    
  },
  "Grok_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Grok/Grok_Domain.yaml",
    "path": "./ruleset/Grok_Domain.yaml"    
  },
  "Twitter_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Twitter/Twitter.yaml",
    "path": "./ruleset/Twitter_Do_Resolve"
  },
  "Telegram_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.yaml",
    "path": "./ruleset/Telegram_Do_Resolve.yaml"
  },
  "YouTube_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/YouTube_Do_Resolve.yaml"
  },
  "TikTok_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/TikTok_Do_Resolve"
  },
  "Bing_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml",
    "path": "./ruleset/Bing_Do_Resolve.yaml"    
  },
  "Apple_IP": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Apple/Apple_IP.yaml",
    "path": "./ruleset/Apple_IP.yaml"
  },
  "Apple_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Apple/Apple_Domain.yaml",
    "path": "./ruleset/Apple_Domain.yaml"
  },
  "Google_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/Google_Do_Resolve.yaml"
  },
  "MicrosoftAPPs_Domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/MicrosoftAPPs/MicrosoftAPPs_Domain.yaml",
    "path": "./ruleset/MicrosoftAPPs_Domain.yaml" 
  },
  "Cloudflare_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Cloudflare/Cloudflare.yaml",
    "path": "./ruleset/Cloudflare_Do_Resolve.yaml"    
  },
  "Cloudflare_IPv4_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "format": "text",
    "url": "https://www.cloudflare.com/ips-v4",
    "path": "./ruleset/Cloudflare_IPv4_Do_Resolve.txt"    
  },
  "Cloudflare_IPv6_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "format": "text",
    "url": "https://www.cloudflare.com/ips-v6",
    "path": "./ruleset/Cloudflare_IPv6_Do_Resolve.txt"
  },
  "Fastly_IP_Do_Resolve": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Fastly/Fastly_IP.yaml",
    "path": "./ruleset/Fastly_IP_Do_Resolve.yaml"
  },
};

// 规则
const rules = [

  // DNS & NTP
    "AND,((OR,((DST-PORT,53),(DST-PORT,853))),(NOT,((GEOIP,CN)))),节点选择",
    "RULE-SET,GlobalDNS_Domain,节点选择",
    "RULE-SET,GlobalDNS_IP,节点选择",

    "AND,((OR,((DST-PORT,53),(DST-PORT,853))),(GEOIP,CN)),全局直连",
    "RULE-SET,ChinaDNS_Domain,全局直连",
    "RULE-SET,ChinaDNS_IP,全局直连",

    "AND,((NETWORK,udp),(DST-PORT,123),(NOT,((GEOIP,CN)))),节点选择",
    "AND,((NETWORK,udp),(DST-PORT,123),(GEOIP,CN)),全局直连",

    // 局域网
    "GEOSITE,private,全局直连",
    "RULE-SET,Lan_Do_Resolve,全局直连",

    // 反私有DNS
    "GEOSITE,category-httpdns-cn,全局拦截",
    "RULE-SET,BlockHttpDNS_Do_Resolve,全局拦截",

    // 反劫持
    "RULE-SET,Hijacking_Do_Resolve,全局拦截",
    "RULE-SET,HijackingPlus_Do_Resolve,全局拦截",

    // 保护隐私
    "RULE-SET,PreRepairEasyPrivacy_REJECT_Do_Resolve,全局拦截",
  
    // 个人emby
    "RULE-SET,my-Emby,Emby",

    // GEOSITE + GeoIP（中国）
    "RULE-SET,GeositeCN_Domain,全局直连",
    "GEOIP,cn,全局直连",
    "GEOIP,cloudflare-cn,全局直连",
    "RULE-SET,CloudflareCN_Do_Resolve,全局直连",

    // AI
    "GEOSITE,openai,AI",
    "RULE-SET,OpenAI_Do_Resolve,AI",
    "GEOSITE,google-gemini,AI",
    "RULE-SET,Gemini_Domain,AI",
    "GEOSITE,anthropic,AI",
    "RULE-SET,Claude_Do_Resolve,AI",
    "RULE-SET,Copilot_Domain,AI",
    "GEOSITE,xai,AI",
    "RULE-SET,Grok_Domain,AI",
  
    // 社交
    "GEOSITE,twitter,X",
    "RULE-SET,Twitter_Do_Resolve,X",
    "GEOSITE,telegram,Telegram",
    "RULE-SET,Telegram_Do_Resolve,Telegram",
  
    // 流媒体
    "GEOSITE,youtube,YouTube",
    "RULE-SET,YouTube_Do_Resolve,YouTube",
    "GEOSITE,tiktok,TikTok",
    "RULE-SET,TikTok_Do_Resolve,TikTok",
  
    // 工具
    "GEOSITE,bing,节点选择",
    "RULE-SET,Bing_Do_Resolve,节点选择",
  
    // 服务
    "GEOSITE,google,谷歌服务",
    "RULE-SET,Google_Do_Resolve,谷歌服务",
    "RULE-SET,Apple_Domain,苹果服务",
    "RULE-SET,Apple_IP,苹果服务",
    "RULE-SET,MicrosoftAPPs_Domain,微软服务",

    // 海外
    "GEOSITE,cloudflare,节点选择",
    "RULE-SET,Cloudflare_Do_Resolve,节点选择",
    "RULE-SET,Cloudflare_IPv4_Do_Resolve,节点选择",
    "RULE-SET,Cloudflare_IPv6_Do_Resolve,节点选择",
    "GEOSITE,fastly,节点选择",
    "RULE-SET,Fastly_IP_Do_Resolve,节点选择",

    // 兜底分流
    "MATCH,漏网之鱼"
  
];

 // 添加地区分组：支持 proxies & proxy-providers
function addRegions(config) {
  let regions = [];  // 用来存储地区名称
  let usedNodes = []; // 用来存储已使用的节点名称
  let isProviderMode = !config.proxies || config.proxies.length === 0;

  // 1. 生成地区分组
  if (isProviderMode) {
    // 情况 1：处理 proxy-providers 模式
    if (!config["proxy-providers"]) return;
    const providers = Object.keys(config["proxy-providers"]);
    if (providers.length === 0) return;

    for (const region of regionConfig) {
      let regionNodes = [];
      for (const pname of providers) {
        const provider = config["proxy-providers"][pname];
        if (!provider || !provider.proxies) continue;
        for (const p of provider.proxies) {
          if (!p || !p.name) continue;
          
          if (!region.matcher) {
            // 如果没有 matcher,表示是“其他地区”，排除已指定地区的节点
            if (!usedNodes.includes(p.name)) {  // 用 usedNodes 来排除已使用的节点
              regionNodes.push(p.name);
              usedNodes.push(p.name); // 将该节点加入已使用节点列表
            }    
          } else {
            const parts = region.matcher.split("|");
            if (parts.some(m => p.name.includes(m))) {
              regionNodes.push(p.name);
              usedNodes.push(p.name); // 将该节点加入已使用节点列表
            }
          }
        }
      }
      if (regionNodes.length === 0) continue;
      config["proxy-groups"].push({
        ...groupBaseOption,
        name: region.name,
        type: "select",
        proxies: regionNodes,
        icon: region.icon,
      });
      regions.push(region.name);
    }
  } else {
    // 情况 2：处理静态 proxies 模式
    const names = config.proxies.map(p => p.name).filter(Boolean);
    for (const region of regionConfig) {
      let regionNodes = [];

      if (!region.matcher) {
        // 如果没有 matcher,表示“其他”地区，只排除已存在的地区
        regionNodes = names.filter(name => !regions.includes(name) && !usedNodes.includes(name));
      } else {
        const parts = region.matcher.split("|");
        regionNodes = names.filter(name => parts.some(m => name.includes(m)) && !usedNodes.includes(name));
      }
      if (regionNodes.length === 0) continue;
      config["proxy-groups"].push({
        ...groupBaseOption,
        name: region.name,
        type: "select",
        proxies: regionNodes,
        icon: region.icon,
      });
      regions.push(region.name);
      usedNodes.push(...regionNodes); // 将当前地区的节点加入已使用节点列表
    }
  }

  if (regions.length === 0) return;

  // 2. 统一插入“地区选择”总组
  config["proxy-groups"].splice(2, 0, {
    ...groupBaseOption,
    name: "地区选择",
    type: "select",
    proxies: regions,
    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Area.png",
  });

  // 3. 统一注入逻辑 (黑名单防御)
  for (const entry of config["proxy-groups"]) {
    if (!entry || !entry.proxies) continue;

    // A. 节点选择组
    if (entry.name === "节点选择") {
      entry.proxies.splice(1, 0, "地区选择");
    } 
    
    // B. 其他分流组：注入地区列表
    else if (entry.type === "select" && !entry.hasOwnProperty("include-all")) {
      
      const skipGroups = [
        "地区选择",
        "全局直连",
        "全局拦截", 
        "手动选择",
        ...regions // 必须包含这个，防止地区组自包含导致 loop 环路报错
      ];

      if (!skipGroups.includes(entry.name)) {
        entry.proxies.push(...regions);
      }
    }
  }
}

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["手动选择", "延迟选优", "故障转移","全局直连"],
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Available_1.png"
    },
    {
    ...groupBaseOption,
        name: "手动选择",
        type: "select",
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png"
    },
    {
    ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      interval: test_interval,
      tolerance: test_tolerance,
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bypass.png"
    },
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
    },
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok_1.png"
    },
    {
      ...groupBaseOption,
      "name": "X",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "地区选择", "延迟选优", "故障转移","全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择","全局直连", "地区选择"],
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  
  // 地区分组
  addRegions(config);
    config["proxies"]?.forEach(proxy => {
      
      // 为每个节点设置 udp = true
      if (proxy) proxy.udp = true;
      
    });
  
    // 返回修改后的配置
    return config;
}
