import type { SystemService } from './types'

export const demoServices: SystemService[] = [
  { id: 'frontend', name: 'NASP frontend', check: 'HTTPS va sahifa yuklanishi', status: 'healthy', checkedAt: '2026-11-24T10:29:48+05:00', responseMs: 112, detail: 'Kirish sahifasi yuklandi, statik resurs mavjud.', dependency: 'HTTPS proksi' },
  { id: 'backend', name: 'NASP backend', check: 'So‘rov qabul qilishga tayyorlik', status: 'healthy', checkedAt: '2026-11-24T10:29:50+05:00', responseMs: 42, detail: 'Readiness tekshiruvi muvaffaqiyatli.', dependency: 'Oracle ulanish puli' },
  { id: 'auth', name: 'Autentifikatsiya', check: 'Sinov hisobining sessiyasini olish', status: 'healthy', checkedAt: '2026-11-24T10:29:54+05:00', responseMs: 163, detail: 'Sinov sessiyasi muvaffaqiyatli ochildi.', dependency: 'NASP backend' },
  { id: 'oracle', name: 'Oracle', check: 'Ulanish va resurslar holati', status: 'degraded', checkedAt: '2026-11-24T10:30:00+05:00', responseMs: null, detail: 'Ulanish bor. 2 ta sessiya bloklangan, NASP_DATA 86% band.', dependency: 'Oracle monitoring hisobi' },
  { id: 'worker', name: 'Fon vazifalari', check: 'Vazifa heartbeat va navbat', status: 'unknown', checkedAt: null, responseMs: null, detail: 'Yig‘uvchi sozlanishi kutilmoqda.', dependency: 'NASP scheduler' },
  { id: 'zabbix', name: 'Metrikalar yig‘ilishi', check: 'Agentdan oxirgi o‘lchov', status: 'healthy', checkedAt: '2026-11-24T10:30:00+05:00', responseMs: null, detail: 'Demo agent o‘z vaqtida o‘lchov yubordi.', dependency: 'Zabbix agent' },
]
