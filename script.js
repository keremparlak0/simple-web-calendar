
const monthYearDisplay = document.getElementById('monthYearDisplay');
const calendarDays = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const todayBtn = document.getElementById('todayBtn');
const tooltip = document.getElementById('tooltip');
const messageBox = document.getElementById('messageBox');
const addEventBtn = document.getElementById('addEventBtn');
const addEventModal = document.getElementById('addEventModal');
const addEventForm = document.getElementById('addEventForm');
const closeModalBtn = document.getElementById('closeModalBtn');
const eventTitleInput = document.getElementById('eventTitle');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const eventTrainerInput = document.getElementById('eventTrainer');
const eventContentInput = document.getElementById('eventContent');
const eventDetailsModal = document.getElementById('eventDetailsModal');
const eventDetailsTitle = document.getElementById('eventDetailsTitle');
const eventDetailsDates = document.getElementById('eventDetailsDates');
const eventDetailsTrainer = document.getElementById('eventDetailsTrainer');
const eventDetailsContent = document.getElementById('eventDetailsContent');
const closeDetailsModalBtn = document.getElementById('closeDetailsModalBtn');

const monthYearPickerModal = document.getElementById('monthYearPickerModal');
const monthYearInput = document.getElementById('monthYearInput');
const closeMonthYearPickerModalBtn = document.getElementById('closeMonthYearPickerModal');

const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const eventColor = '#3b82f6';

const events = [
    { startDate: '2025-08-15', endDate: '2025-08-15', title: 'Angular İleri Seviye', egitmen: 'Ayşe Yılmaz', icerik: 'Angular\'ın ileri seviye konularına giriş, durum yönetimi ve performans optimizasyonu.' },
    { startDate: '2025-08-15', endDate: '2025-08-15', title: 'ASP.NET MVC Temelleri', egitmen: 'Mehmet Kaya', icerik: 'ASP.NET MVC yapısı, Controller, View ve Model kullanımı.' },
    { startDate: '2025-08-15', endDate: '2025-08-15', title: 'Veritabanı Eğitimi', egitmen: 'Fatma Demir', icerik: 'SQL sorgulama, tablo ilişkileri ve temel veritabanı işlemleri.' },
    { startDate: '2025-08-22', endDate: '2025-08-22', title: 'Veritabanı Tasarımı', egitmen: 'Ahmet Çelik', icerik: 'İlişkisel veritabanı tasarımı prensipleri ve normalizasyon.' },

    { startDate: '2025-09-05', endDate: '2025-09-09', title: 'DevOps Temelleri', egitmen: 'Caner Bilgin', icerik: 'CI/CD boru hatları, otomasyon araçları ve altyapı yönetimi.' },
    { startDate: '2025-09-05', endDate: '2025-09-19', title: 'DevOps Temelleri 2', egitmen: 'Caner Bilgin', icerik: 'Kubernetes, Docker ve konteyner yönetimi.' },
    { startDate: '2025-09-12', endDate: '2025-09-13', title: 'Web Güvenliği', egitmen: 'Zeynep Öztürk', icerik: 'Web uygulamalarında sık görülen güvenlik açıkları ve korunma yöntemleri.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Test Otomasyonu', egitmen: 'Murat Arslan', icerik: 'Selenium ve diğer otomasyon araçlarıyla test senaryoları oluşturma.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Agile Metodolojileri', egitmen: 'Ebru Yıldız', icerik: 'Scrum ve Kanban gibi çevik metodolojilerin uygulama pratikleri.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Proje Yönetimi', egitmen: 'Kerem Tekin', icerik: 'Proje planlama, izleme ve raporlama teknikleri.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Bireysel Koçluk', egitmen: 'Dilek Güneş', icerik: 'Kariyer hedefleri belirleme ve kişisel gelişim üzerine koçluk seansları.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Bireysel Koçluk', egitmen: 'Dilek Güneş', icerik: 'Kariyer hedefleri belirleme ve kişisel gelişim üzerine koçluk seansları.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Bireysel Koçluk', egitmen: 'Dilek Güneş', icerik: 'Kariyer hedefleri belirleme ve kişisel gelişim üzerine koçluk seansları.' },
    { startDate: '2025-10-20', endDate: '2025-10-24', title: 'Bireysel Koçluk', egitmen: 'Dilek Güneş', icerik: 'Kariyer hedefleri belirleme ve kişisel gelişim üzerine koçluk seansları.' },
];

function getEventsForDay(date) {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        const current = new Date(dateString);
        current.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        return current >= start && current <= end;
    });
}

function renderCalendar() {
    calendarDays.innerHTML = '';
    monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayIndex; i > 0; i--) {
        const dayCell = document.createElement('div');
        const dayNumberSpan = document.createElement('span');
        dayNumberSpan.textContent = daysInPrevMonth - i + 1;
        dayNumberSpan.classList.add('day-number');
        dayCell.appendChild(dayNumberSpan);
        dayCell.classList.add('day-cell', 'disabled');
        calendarDays.appendChild(dayCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');

        const date = new Date(currentYear, currentMonth, i);
        const eventsForDay = getEventsForDay(date);

        const dayNumberSpan = document.createElement('span');
        dayNumberSpan.textContent = i;
        dayNumberSpan.classList.add('day-number');
        dayCell.appendChild(dayNumberSpan);

        if (i === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
            dayCell.classList.add('today');
        }

        if (eventsForDay.length > 0) {
            dayCell.classList.add('has-events');

            const eventTitlesContainer = document.createElement('div');
            eventTitlesContainer.classList.add('event-titles-container');

            eventsForDay.forEach(event => {
                const eventTitleSpan = document.createElement('span');
                eventTitleSpan.textContent = event.title;
                eventTitleSpan.classList.add('event-title');
                eventTitleSpan.setAttribute('data-event-title', event.title);
                eventTitlesContainer.appendChild(eventTitleSpan);

                // Her bir event başlığı için mouseover ve mouseout olayları ekleniyor
                eventTitleSpan.addEventListener('mouseover', (e) => {
                    const eventTitle = e.target.getAttribute('data-event-title');
                    const foundEvent = events.find(ev => ev.title === eventTitle);
                    if (foundEvent) {
                        tooltip.innerHTML = `<strong>${foundEvent.title}</strong><br>${foundEvent.icerik}`;
                        tooltip.classList.add('show');
                        const rect = e.target.getBoundingClientRect();
                        // Sayfanın kaydırma miktarını ekleyerek tooltip'i doğru konuma getiriyoruz.
                        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                        tooltip.style.top = `${rect.top + window.scrollY}px`;
                    }
                });

                eventTitleSpan.addEventListener('mouseout', () => {
                    tooltip.classList.remove('show');
                });
            });

            dayCell.appendChild(eventTitlesContainer);

            // Günlük eventlerin detaylarını göstermek için click olayı
            eventTitlesContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                const clickedEventTitle = e.target.getAttribute('data-event-title');
                const clickedEvent = events.find(event => event.title === clickedEventTitle);
                if (clickedEvent) {
                    showEventDetails(clickedEvent);
                }
            });
        }

        calendarDays.appendChild(dayCell);
    }

    const remainingCells = 42 - (startDayIndex + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        const dayCell = document.createElement('div');
        const dayNumberSpan = document.createElement('span');
        dayNumberSpan.textContent = i;
        dayNumberSpan.classList.add('day-number');
        dayCell.appendChild(dayNumberSpan);
        dayCell.classList.add('day-cell', 'disabled');
        calendarDays.appendChild(dayCell);
    }
}

// Tarih formatını dd.mm.yyyy'ye dönüştüren yardımcı fonksiyon
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
}

function showEventDetails(event) {
    eventDetailsTitle.textContent = event.title;
    // Tarih formatını güncelleme
    eventDetailsDates.textContent = `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`;
    eventDetailsTrainer.textContent = event.egitmen || 'Belirtilmemiş';
    eventDetailsContent.textContent = event.icerik || 'Belirtilmemiş';
    eventDetailsModal.classList.add('show');
}

closeDetailsModalBtn.addEventListener('click', () => {
    eventDetailsModal.classList.remove('show');
});

prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

todayBtn.addEventListener('click', () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
});

monthYearDisplay.addEventListener('click', () => {
    const monthString = String(currentMonth + 1).padStart(2, '0');
    monthYearInput.value = `${currentYear}-${monthString}`;
    monthYearPickerModal.classList.add('show');
});

monthYearInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
        const [year, month] = selectedDate.split('-');
        currentYear = parseInt(year, 10);
        currentMonth = parseInt(month, 10) - 1;
        renderCalendar();
        monthYearPickerModal.classList.remove('show');
    }
});

closeMonthYearPickerModalBtn.addEventListener('click', () => {
    monthYearPickerModal.classList.remove('show');
});

function showNotification(message) {
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

addEventBtn.addEventListener('click', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDateString = `${year}-${month}-${day}`;

    startDateInput.value = todayDateString;
    startDateInput.min = todayDateString;
    endDateInput.min = todayDateString;

    addEventModal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
    addEventModal.classList.remove('show');
    addEventForm.reset();
    startDateInput.min = '';
    endDateInput.min = '';
});

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = eventTitleInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const trainer = eventTrainerInput.value;
    const content = eventContentInput.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedStartDate = new Date(startDate);
    selectedStartDate.setHours(0, 0, 0, 0);

    if (selectedStartDate < today) {
        showNotification('Hata: Eğitim başlangıç tarihi geçmiş bir tarih olamaz.');
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        showNotification('Hata: Başlangıç tarihi bitiş tarihinden sonra olamaz.');
        return;
    }

    events.push({ startDate, endDate, title, egitmen: trainer, icerik: content });

    addEventForm.reset();
    addEventModal.classList.remove('show');

    renderCalendar();
    showNotification('Yeni eğitim başarıyla eklendi!');
});


window.onload = function () {
    renderCalendar();
};
