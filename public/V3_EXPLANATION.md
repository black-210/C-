# C> (C-Greater) Version 3.0 Universal & Systems Guide
# دليل وشرح شامل لإصدار C> v3.0 Universal & Bare-Metal Edition

---

## 🌟 نبذة عامة | Executive Summary
**C>** (تُنطق *C-Greater*) في إصدارها الثالث **v3.0** أصبحت لغة برمجية شاملة وعالمية تجمع بين:
1. **سهولة فائقة للمبتدئين** (أبسط وأوضح من بايثون وبدون تعقيدات).
2. **تحكم كامل ومنخفض المستوى بالعتاد والمعالج (Low-level Assembly-like Silicon Control)**.
3. **برمجة كروت الشاشة والمعالجة المتوازية (GPU Compute Shaders)**.
4. **نظام أمان متطور للذاكرة والتحقق الرياضي الشكلي (Formal Contracts)**.
5. **مترجم مستقل تماماً (Autonomous Self-Hosting)** لا يعتمد على أي مترجم C خارجي.
6. **إضافة رسمية محدثة لمحرر VS Code (الإصدار 3.0.0)** تدعم التلوين الذكي، الإكمال التلقائي، والقوالب التفاعلية المخصصة لكودك.

---

## 1. قسم المبتدئين فائق السهولة (Ultra-Simple Beginner Layer)

تم تصميم هذا القسم ليتيح لأي مبتدئ كتابة برامج فورية بدون تعقيد، وبدون دوال `main()` إجبارية أو مكتبات معقدة.

### 1.1 `say` — أمر الطباعة السهل والمباشر
يطبع النصوص، الأرقام، والمتغيرات بسلاسة تامة دون الحاجة لأقواس أو محددات معقدة:
```cgt
say "مرحباً بكم في لغة C> v3.0!";
say "النتيجة: ", 100, " | الحالة: جاهز";
```

### 1.2 `ask` — استقبال المدخلات التفاعلية
يطلب من المستخدم إدخال بيانات مع التعرف التلقائي على نوع البيانات:
```cgt
let user_name = ask("من فضلك أدخل اسمك: ");
say "أهلاً بك يا ", user_name, " في C>!";
```

### 1.3 `repeat ... times` — حلقات التكرار الطبيعية
تكرار بعدد محدد بدون أخطاء المؤشرات أو دوال `range`:
```cgt
repeat 3 times {
    say "C> لغة سريعة، شاملة، وسهلة للجميع!";
}
```

### 1.4 `whenever` و `otherwise` — اتخاذ القرارات الواضحة
جمل شرطية بديهية ومقروءة باللغة الطبيعية:
```cgt
let score = 95;
whenever score >= 90 {
    say "التقدير: امتياز مع مرتبة الشرف!";
} otherwise {
    say "التقدير: ناجح.";
}
```

### 1.5 `define` — تعريف الدوال البسيطة
تعريف الدوال دون الحاجة لتحديد الأنواع يدوياً إذا رغبت بالاستنتاج التلقائي:
```cgt
define calculate_price(price, tax) {
    return price * (1.0 + tax);
}

let total = calculate_price(100, 0.15);
say "الإجمالي: ", total;
```

### 1.6 `given ... when` — مطابقة الأنماط الذكية
بديل فائق الوضوح لجمل `switch` القديمة:
```cgt
let role = "admin";
given role {
    when "admin"     => say "صلاحيات مدير كاملة.";
    when "developer" => say "صلاحيات برمجة وتطوير.";
    otherwise        => say "صلاحيات مستخدم عادي.";
}
```

### 1.7 `fail_safe` و `fallback` — الحماية التلقائية من الأخطاء
كتلة تضمن استمرار البرنامج في حال حدوث أي طارئ دون انهيار النظام:
```cgt
fail_safe {
    say "محاولة الاتصال بالخادم الرئيسي...";
} fallback {
    say "تم التبديل تلقائياً للبيانات المحلية المخزنة.";
}
```

---

## 2. ميزات التجميع والتحكم بالعتاد (Low-Level Assembly-Like Features)

للمهندسين ومطوري أنظمة التشغيل والبرمجيات المضمنة (Embedded Systems & Kernel Developers)، يوفر الإصدار 3.0 وصولاً مباشراً إلى السيليكون وسجلات المعالج:

### 2.1 سجلات المعالج وأوامر التجميع المباشرة (`asm volatile`)
تنفيذ تعليمات الآلة للمعالج مباشرة مثل قراءة عداد دورات المعالج بدقة الميكروثانية (`rdtsc`):
```cgt
module hardware::cpu::registers;

fn read_cpu_cycles() -> u64 {
    let mut lo: u32 = 0;
    let mut hi: u32 = 0;
    
    unsafe {
        asm volatile (
            "rdtsc"
            : "=a"(lo), "=d"(hi)
            : 
            : "memory"
        );
    }
    return ((hi as u64) << 32) | (lo as u64);
}
```

### 2.2 التحكم بمنافذ اللوحة الأم (`cpu_port_out` / `cpu_port_in`)
كتابة وقراءة منافذ I/O مباشرة كما في بطاقات المنفذ التسلسلي (UART COM1) ومتحكمات الـ PIC:
```cgt
module kernel::drivers::uart;

const COM1_PORT: u16 = 0x3F8;

fn init_serial() -> void {
    lowlevel {
        cpu_port_out(COM1_PORT + 1, 0x00); // تعطيل المقاطعات
        cpu_port_out(COM1_PORT + 3, 0x80); // تفعيل Divisor Latch
        cpu_port_out(COM1_PORT + 0, 0x01); // ضبط سرعة 115200 باود
        cpu_port_out(COM1_PORT + 1, 0x00);
        cpu_port_out(COM1_PORT + 3, 0x03); // 8 بت، 1 بت توقف
    }
}
```

### 2.3 دوال خدمة المقاطعات العتادية (`@interrupt_handler`)
دوال تستقبل مقاطعات المعالج (Hardware Interrupts) وتقوم بحفظ وتفريغ مكدس السجلات وإرسال إشارات EOI:
```cgt
module kernel::arch::x86_64::interrupts;

struct InterruptFrame {
    rip: u64,
    cs: u64,
    rflags: u64,
    rsp: u64,
    ss: u64,
}

let mut g_ticks: u64 = 0;

@interrupt_handler
fn timer_isr(frame: *InterruptFrame) -> void {
    g_ticks = g_ticks + 1;
    
    // إشعار متحكم المقاطعات الرئيسي (Master PIC End-Of-Interrupt)
    lowlevel {
        cpu_port_out(0x20, 0x20);
    }
}
```

### 2.4 حلقات الوصول المباشر للذاكرة وإفراغ الكاش (`clflushopt` & `sfence`)
التعامل مع كروت الشبكة ووحدات NVMe السريعة دون تداخل ذاكرة التخزين المؤقت:
```cgt
module kernel::drivers::dma;

struct align(64) DmaBuffer {
    phys_addr: u64,
    len: u32,
}

fn flush_dma_cache(phys: u64) -> void {
    unsafe {
        asm volatile (
            "clflushopt (%0)"
            : 
            : "r"(phys)
            : "memory"
        );
        asm volatile ("sfence" ::: "memory");
    }
}
```

### 2.5 أقفال العتاد السريعة والعمليات الذرية (`atomic_cas64` & `pause`)
تزامن خالي من نداءات النظام البطيئة (Lock-Free Spinlock) باستخدام أوامر المعالج المباشرة:
```cgt
module concurrency::atomics;

struct align(64) HardwareSpinlock {
    locked: u64,
}

fn spin_lock(lock: &mut HardwareSpinlock) -> void {
    while !atomic_cas64(&lock.locked, 0, 1) {
        unsafe {
            asm volatile ("pause" ::: "memory");
        }
    }
}

fn spin_unlock(lock: &mut HardwareSpinlock) -> void {
    atomic_store64(&lock.locked, 0);
}
```

### 2.6 جداول الصفحات وسجل التحكم بالمعالج (`CR3` & `invlpg`)
التحكم الكامل بوحدة إدارة الذاكرة (MMU) وتفعيل العنونة الافتراضية رباعية المستويات (PML4):
```cgt
module kernel::arch::x86_64::paging;

fn switch_address_space(pml4_phys: u64) -> void {
    unsafe {
        asm volatile (
            "movq %0, %%cr3"
            : 
            : "r"(pml4_phys)
            : "memory"
        );
    }
}

fn invalidate_tlb_page(vaddr: u64) -> void {
    unsafe {
        asm volatile (
            "invlpg (%0)"
            : 
            : "r"(vaddr)
            : "memory"
        );
    }
}
```

---

## 3. حوسبة كروت الشاشة والمعالجة المتوازية (GPU Compute Shaders)

يتيح C> v3.0 كتابة كود موحد يعمل على كرت الشاشة ويترجم تلقائياً إلى Vulkan SPIR-V و NVIDIA CUDA PTX و Apple Metal:
```cgt
module graphics::gpu_compute;

@kernel
fn transform_vector(buffer: device_span<f32>, factor: f32) {
    let gid = gpu_global_id();
    buffer[gid] = buffer[gid] * factor;
}

fn main() -> i32 {
    let mut dev_buf: device_span<f32> = gpu_alloc(1048576);
    gpu_dispatch(transform_vector, grid: [1024, 1024, 1], block: [256, 1, 1]);
    say "تمت معالجة أكثر من مليون عملية حسابية بالتوازي على كرت الشاشة!";
    return 0;
}
```

---

## 4. مصحح السفر عبر الزمن الدقيق (Time-Travel Replay Debugger)

تسجيل دقيق لحالة المعالج وسجلات الذاكرة بدون أي تكلفة تشغيلية لتحليل الأعطال في أجزاء من المليون من الثانية:
```cgt
replay transaction_session {
    snapshot_state();
    say "تم تسجيل لقطة عتادية خالية من الأخطاء لجلسة التنفيذ.";
}
```

---

## 5. العقود والتحقق الرياضي الشكلي (Formal Mathematical Verification)

إثبات صحة الكود رياضياً وقت الترجمة باستخدام منطق Hoare:
```cgt
contract BankAccountSecurity {
    invariant(total_balance >= 0);
}

fn withdraw(amount: i32) -> i32 {
    requires(amount > 0);
    requires(amount <= balance);
    ensures(balance >= 0);
    
    balance = balance - amount;
    return balance;
}
```

---

## 6. إضافة محرر VS Code الرسمية (C> v3.0.0 Extension)

الإضافة متوفرة ومجهزة في الملف:
`public/c-greater-3.0.0.vsix`

### مميزات الإضافة:
1. **دعم كامل لـ 20 بنية لغوية مع شروحات تعليمية مخصصة للمبتدئين**:
   - لا تضع قوالب عمياء مباشرة، بل تعرض شرحاً مبسطاً أولاً يوضح وظيفة الكود ولماذا يستخدمه المبتدئ، ثم تتيح اختيار القالب المناسب بضغطة زر.
2. **أربعة مستويات من القوالب التفاعلية**:
   - `Basic Template`: قالب أولي سريع مع مواضع تنقل جاهزة (Tabstops).
   - `Practical Real-World`: مثال عملي تطبيقي متكامل.
   - `Production Safe`: كود محصن باشتراطات أمان وتفادي الأخطاء.
   - `Tailored to Your Code`: قالب ذكي مخصص ومولد بناءً على النص أو المتغير المحدد في كودك الحالي!
3. **ألوان وتظليل ذكي (Syntax Highlighting)** لكافة أوامر v3، العتاد، كروت الشاشة، وسجلات المعالج.

### كيفية تثبيت الإضافة:
افتح الطرفية (Terminal) واكتب:
```bash
code --install-extension c-greater-3.0.0.vsix
```
أو في محررات Code-OSS و VSCodium:
```bash
codium --install-extension c-greater-3.0.0.vsix
```

---

## 7. مقارنة شاملة (Comparison Matrix)

| الميزة | C التقليدية | Rust | Python | C> v3.0 Flagship |
|---|---|---|---|---|
| **سهولة التعلم للمبتدئ** | صعبة ومعقدة | شديدة الصعوبة | سهلة ولكن بطيئة | **أبسط من بايثون وسريعة كالسيليكون** |
| **التحكم بالعتاد وسجلات CPU** | تتطلب مجمّع خارجي | عبر FFI ومكتبات | غير ممكنة إطلاقاً | **مدمجة كعنصر لغوي أصيل (`asm volatile`, `ports`)** |
| **كروت الشاشة (GPU Compute)** | مكتبات خارجية منفصلة | مكتبات غير قياسية | بطيئة جداً | **مدمجة (`@kernel`, SPIR-V, PTX, Metal)** |
| **الترجمة الذاتية (Self-Hosting)** | تتطلب GCC/Clang | تتطلب LLVM | تتطلب CPython | **مترجم ذاتي 100% C> بدون أي تبعيات خارجية** |
| **إثبات الصحة الرياضي** | غير متوفر | محدود بالأنواع | غير متوفر | **مدمج بالكامل (`contract`, `requires`, `ensures`)** |

---
**C> (C-Greater) — لغة واحدة للجميع: من البرامج الأولى للمبتدئين وحتى أعمق طبقات السيليكون وأنظمة التشغيل.**
