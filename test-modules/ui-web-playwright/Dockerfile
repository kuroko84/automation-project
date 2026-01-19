############################################
# 1️⃣ BASE
# OS + Node + Browser (ổn định, ít thay đổi)
############################################
FROM mcr.microsoft.com/playwright:v1.57.0-jammy AS base

WORKDIR /app



############################################
# 2️⃣ DEPS
# Cài dependency dùng chung
############################################
FROM base AS deps

WORKDIR /app

# Chỉ copy package files
COPY package.json package-lock.json* ./

# Cài dependency (cache được)
RUN npm ci



############################################
# 3️⃣ RUNNER
# Chỉ dùng để chạy test (KHÔNG COPY SOURCE)
############################################
FROM deps AS runner

# Thư mục output (mount từ host)
RUN mkdir -p /app/playwright-report

# Default command
CMD sh -c "npx playwright test && npm run parse:report"
