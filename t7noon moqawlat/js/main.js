document.addEventListener('DOMContentLoaded', function() {
    // قائمة الجوال
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // تأثير التمرير للهيدر
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });
    
    // عداد الإحصائيات
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }
    
    // تشغيل العداد عند التمرير للقسم
    const statsSection = document.querySelector('.stats');
    const statsSectionPosition = statsSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    function checkScroll() {
        if (window.scrollY > statsSectionPosition - windowHeight + 100) {
            animateCounters();
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // تصفية المشاريع
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // إضافة النشط للزر المختار
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // عرض الملفات المرفوعة
    const fileInput = document.getElementById('project-files');
    const filePreview = document.getElementById('file-preview');
    
    fileInput.addEventListener('change', function() {
        filePreview.innerHTML = '';
        
        if (this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-preview-item';
                fileItem.innerHTML = `
                    ${file.name} 
                    <i class="fas fa-times remove-file"></i>
                `;
                filePreview.appendChild(fileItem);
            });
        }
    });
    
    // إزالة الملف من المعاينة
    filePreview.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-file')) {
            const fileItem = e.target.parentElement;
            fileItem.remove();
            
            // يمكنك هنا إضافة كود لإزالة الملف من input files إذا لزم الأمر
        }
    });
    
    // شريط الميزانية
    const budgetSlider = document.querySelector('.budget-range input[type="range"]');
    const budgetValue = document.getElementById('budget-value');
    
    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        budgetValue.textContent = value.toLocaleString('ar-SA');
    }); 
    // يمكن الحفاظ على جميع الدوال السابقة مع تعديل العناوين فقط
document.addEventListener('DOMContentLoaded', function() {
    // يمكن إضافة تأثير خاص لعنصر الإشراف
    const supervisorCard = document.querySelector('.supervisor-card');
    if(supervisorCard) {
        supervisorCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        supervisorCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});
    
    // خريطة جوجل
    function initMap() {
        // إحداثيات المقر الرئيسي
        const headquarter = { lat: 24.7136, lng: 46.6753 };
        
        // إنشاء الخريطة
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: headquarter,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#1a5276"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        });
        
        // إضافة علامات للمشاريع
        const projects = [
            {
                position: { lat: 24.7136, lng: 46.6753 },
                title: "مجمع السحاب السكني",
                type: "residential"
            },
            {
                position: { lat: 24.7536, lng: 46.6253 },
                title: "مجمع النخيل التجاري",
                type: "commercial"
            },
            {
                position: { lat: 24.6936, lng: 46.7253 },
                title: "طريق المطار السريع",
                type: "infrastructure"
            }
        ];
        
        projects.forEach(project => {
            let iconColor;
            
            switch(project.type) {
                case 'residential':
                    iconColor = '#2980b9';
                    break;
                case 'commercial':
                    iconColor = '#e67e22';
                    break;
                case 'infrastructure':
                    iconColor = '#2ecc71';
                    break;
                default:
                    iconColor = '#1a5276';
            }
            
            new google.maps.Marker({
                position: project.position,
                map: map,
                title: project.title,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: iconColor,
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 1,
                    scale: 8
                }
            });
        });
    }
    
    // تهيئة تأثيرات الحركة
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // تحريك شريط التقدم في قسم المراحل
    const timelineProgress = document.querySelector('.timeline-progress');
    
    function updateTimelineProgress() {
        const timeline = document.querySelector('.timeline');
        const timelineHeight = timeline.offsetHeight;
        const scrollPosition = window.scrollY;
        const timelinePosition = timeline.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > timelinePosition - windowHeight + 100) {
            const progress = ((scrollPosition - timelinePosition + windowHeight - 100) / timelineHeight) * 100;
            timelineProgress.style.bottom = (100 - Math.min(progress, 100)) + '%';
        }
    }
    
    window.addEventListener('scroll', updateTimelineProgress);
    window.addEventListener('resize', updateTimelineProgress);
    
    // زر العودة للأعلى
    document.getElementById('back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});