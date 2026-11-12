# Отчёт аудита — Идея №2 «Квиз вместо формы»

**Проект:** `02-quiz-calculator/`  
**Продукт:** интерактивный квиз-калькулятор «Расчет кровати»  
**Идея №2 (банк идей):** Квиз вместо формы — пошаговый выбор параметров → цена → заявка  
**URL:** http://localhost:3000/quiz  
**Дата:** 2026-11-08  
**Стек:** Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React  

---

## 1. Итоговый вердикт

| Контроль | Результат |
|----------|-----------|
| Самоконтроль (разработка) | PASS |
| Независимый аудит (чистая проверка) | **PASS** |
| Lint | `LINT_EXIT=0` |
| Production build | `BUILD_EXIT=0`, маршрут `○ /quiz` |
| Live HTTP | `/quiz` = 200, `/` = 200 |

**Статус продукта:** готов к демонстрации.

---

## 2. Чек-лист приёмки

| # | Критерий | Статус | Доказательство |
|---|----------|--------|----------------|
| 1 | Минимум 3 логических шага | ✅ | Шаг 1 размер → Шаг 2 ткань/изголовье → Шаг 3 комплектация/сроки (+ шаг 4 контакты) |
| 2 | Индикатор прогресса | ✅ | «Шаг X из 4 · N%», бар 25% → 50% → 75% → 100% |
| 3 | Динамический пересчёт | ✅ | Цена над баром меняется при клике по карточкам (`calculateBedCost`) |
| 4 | Финальный захват контакта | ✅ | Имя + телефон → WhatsApp-смета (`FinalScreen`) |
| 5 | Анимация переходов | ✅ | `AnimatePresence` + `motion.div` (Framer Motion) |
| 6 | Двойной контроль | ✅ | Этот отчёт + независимый аудит PASS + сырые логи ниже |

---

## 3. Структура квиза

```
src/
├── types/quiz.ts
├── constants/quizData.ts
├── utils/calculator.ts
├── app/quiz/page.tsx
└── components/quiz/
     ├── QuizContainer.tsx
     ├── ProgressBar.tsx
     ├── StepCard.tsx
     ├── QuizNavigation.tsx
     └── FinalScreen.tsx
```

Вход с главной: кнопка «Калькулятор кровати» → `/quiz`.

---

## 4. Текстовые доказательства работы

### 4.1. Карта прогресса и динамический пересчёт

Команда: `node scripts/verify-quiz-checklist.mjs`

```text
=== PROGRESS MAP ===
Step 1/4 => 25%
Step 2/4 => 50%
Step 3/4 => 75%
Step 4/4 => 100%

=== DYNAMIC RECALC (live price on option change) ===
select size 160              retail= 179080  materials=  96800  delta=+0
fabric -> premium            retail= 190920  materials= 103200  delta=+11840
headboard -> high_130        retail= 203241  materials= 109860  delta=+12321
urgency -> express           retail= 230706  materials= 109860  delta=+27465
exclude mattress             retail= 197106  materials=  93860  delta=-33600

=== BASE CASES ===
PASS 90 all-in: materials=70550 retail=130518
PASS 160 all-in: materials=96800 retail=179080
PASS 180 all-in: materials=113000 retail=209050
TOTAL_FAILS 0
VERIFY_EXIT=0
```

### 4.2. Live HTTP

```text
QUIZ_STATUS=200
MATCH_Шаг=True
MATCH_%=True
MATCH_Расчет кровати=True
MATCH_Односпальная=True
MATCH_Двуспальная=True
MATCH_King Size=True
MATCH_Далее=True
HOME_STATUS=200
HOME_CTA=True
HOME_HREF=True
```

### 4.3. Lint / Build

```text
LINT_EXIT=0

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /quiz

BUILD_EXIT=0
```

### 4.4. Независимый аудит (чистая проверка)

Агент-аудитор без доверия к прошлым утверждениям:

- Checklist items 1–6 → все **PASS**
- `VERDICT: PASS`
- Agent ID: `403f45fc-66b3-4f49-846b-acd5bcead67c`

---

## 5. Как воспроизвести демо

```bash
cd mebel-link
npm run dev
```

Открыть:

1. http://localhost:3000 — кнопка «Калькулятор кровати»
2. http://localhost:3000/quiz — квиз напрямую

Сценарий: выбрать размер → ткань/изголовье → комплектацию → увидеть живую цену → на финале ввести имя/телефон → «Получить подробную смету в WhatsApp».
