# TeaSource V0.1 — 交付与验收记录

更新：2026-10-29（Asia/Shanghai）

**状态：网站开发与本地验收完成；正式上线尚未完成。**

- 唯一仓库：https://github.com/auturock067-spec/tea-source
- 对外名称：PENG Tea Sourcing（临时名称，未完成商标清权）
- 本地目录：D:\AgentForge\tea-source
- 应用提交：b126f2564723f78926a33b03d5a9f3d2cbdd034f
- 已合并 PR：https://github.com/auturock067-spec/tea-source/pull/1
- 应用主分支 CI：https://github.com/auturock067-spec/tea-source/actions/runs/40892747473 （成功）
- 本地预览：http://127.0.0.1:4173/en/ （仅本机，不是生产网址）
- 生产 HTTPS 地址：尚无可核实地址。

## 已完成

26个中英文页面；六个采购品类详情；茶叶产区；采购与质量/进口合规指南；客户端 RFQ 校验、编辑、复制、UTF-8文本下载、无预设收件人的邮件草稿。页面明确不发送询盘。没有编造供应商、价格、认证或检测结果；图像为原创本地SVG。六份研究/产品/架构/内容/验收/部署文档已入仓库。

## 实测证据

6项结构检查、26项Chromium浏览器检查全部通过。全部26个语言页面分别在320/390/768/1440宽度验收，共104次页面/视口检查。搜索/导航/语言切换/六品类预选/无效输入/下载/剪贴板/邮件草稿/恶意文本/无HTTP传输与存储均检查；14次双语主要页面可访问性扫描无违规。浏览器测试耗时35.2秒。真实桌面浏览器视口模拟不等于实体手机或全部浏览器兼容性。

## 部署阻塞

Cloudflare已登录，GitHub应用授权已获你明确同意，但保存tea-source访问范围时GitHub要求本人再次验证。你暂时无法完成验证，因此授权尚未保存，也没有创建Pages项目。预览/生产部署、线上HTTPS与响应头、Git触发更新和回滚均未执行。

恢复只需从GitHub验证继续，不需要重建源码。GitHub授权页：https://github.com/settings/installations/167224604 。仅新增tea-source，不选All repositories。随后按仓库docs/DEPLOYMENT.md配置Pages：main / npm run build / dist / Node24。

## 交付文件

- tea-source-v0.1-static.zip：可部署静态文件；不包含账户凭据。
- tea-source-v0.1-evidence.zip：本地测试结果、浏览器报告和截图。
- tea-home-desktop.jpg / tea-rfq-mobile.jpg：真实本地浏览器截图。

## 已知产品范围

RFQ尚无接收邮箱；生成后由买家自行发送。合规内容附官方来源，但不是法律意见或进口保证。品牌仍需进一步清权。除TeaSource外未修改其他项目。
