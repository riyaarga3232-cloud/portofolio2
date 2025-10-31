// Data Storage
let members = [];
let divisions = [];
let activities = [];

// Initialize with sample data
function initializeSampleData() {
    divisions = [
        { id: 1, name: 'Teknologi Informasi', description: 'Mengelola sistem dan teknologi organisasi', head: 'Budi Santoso' },
        { id: 2, name: 'Keuangan', description: 'Mengelola keuangan dan anggaran organisasi', head: 'Siti Nurhaliza' },
        { id: 3, name: 'Hubungan Masyarakat', description: 'Mengelola komunikasi dan hubungan eksternal', head: 'Ahmad Wijaya' }
    ];

    members = [
        { id: 1, name: 'Budi Santoso', email: 'budi@email.com', phone: '081234567890', division: 'Teknologi Informasi', position: 'Ketua Divisi' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', phone: '081234567891', division: 'Keuangan', position: 'Ketua Divisi' },
        { id: 3, name: 'Ahmad Wijaya', email: 'ahmad@email.com', phone: '081234567892', division: 'Hubungan Masyarakat', position: 'Ketua Divisi' }
    ];

    activities = [
        { id: 1, name: 'Rapat Koordinasi Bulanan', description: 'Rapat rutin koordinasi semua divisi', date: '2025-11-15', time: '14:00', location: 'Ruang Rapat A', division: 'Teknologi Informasi' },
        { id: 2, name: 'Workshop Digital Marketing', description: 'Pelatihan strategi pemasaran digital', date: '2025-11-20', time: '09:00', location: 'Aula Utama', division: 'Hubungan Masyarakat' }
    ];

    updateAllDisplays();
}

// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            if (tabName === 'dashboard') {
                updateDashboard();
            }
        });
    });

    initializeSampleData();
});

// Members Functions
function showAddMemberForm() {
    document.getElementById('addMemberForm').style.display = 'block';
    updateDivisionSelects();
}

function hideAddMemberForm() {
    document.getElementById('addMemberForm').style.display = 'none';
    document.getElementById('addMemberForm').querySelector('form').reset();
}

function addMember(event) {
    event.preventDefault();

    const member = {
        id: Date.now(),
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        division: document.getElementById('memberDivision').value,
        position: document.getElementById('memberPosition').value
    };

    members.push(member);
    displayMembers();
    hideAddMemberForm();
    updateDashboard();
}

function displayMembers() {
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';

    members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.division}</td>
            <td>${member.position}</td>
            <td>
                <button class="btn-edit" onclick="editMember(${member.id})">Edit</button>
                <button class="btn-danger" onclick="deleteMember(${member.id})">Hapus</button>
            </td>
        `;
        membersList.appendChild(row);
    });
}

function deleteMember(id) {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
        members = members.filter(m => m.id !== id);
        displayMembers();
        updateDashboard();
    }
}

function editMember(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;

    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone;
    document.getElementById('memberDivision').value = member.division;
    document.getElementById('memberPosition').value = member.position;

    showAddMemberForm();
    deleteMember(id);
}

function searchMembers() {
    const searchTerm = document.getElementById('searchMember').value.toLowerCase();
    const rows = document.querySelectorAll('#membersList tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Divisions Functions
function showAddDivisionForm() {
    document.getElementById('addDivisionForm').style.display = 'block';
}

function hideAddDivisionForm() {
    document.getElementById('addDivisionForm').style.display = 'none';
    document.getElementById('addDivisionForm').querySelector('form').reset();
}

function addDivision(event) {
    event.preventDefault();

    const division = {
        id: Date.now(),
        name: document.getElementById('divisionName').value,
        description: document.getElementById('divisionDesc').value,
        head: document.getElementById('divisionHead').value
    };

    divisions.push(division);
    displayDivisions();
    updateDivisionSelects();
    hideAddDivisionForm();
    updateDashboard();
}

function displayDivisions() {
    const divisionsList = document.getElementById('divisionsList');
    divisionsList.innerHTML = '';

    divisions.forEach(division => {
        const card = document.createElement('div');
        card.className = 'division-card';
        card.innerHTML = `
            <h3>${division.name}</h3>
            <p><strong>Ketua:</strong> ${division.head}</p>
            <p>${division.description}</p>
            <div class="card-actions">
                <button class="btn-edit" onclick="editDivision(${division.id})">Edit</button>
                <button class="btn-danger" onclick="deleteDivision(${division.id})">Hapus</button>
            </div>
        `;
        divisionsList.appendChild(card);
    });
}

function deleteDivision(id) {
    if (confirm('Apakah Anda yakin ingin menghapus divisi ini?')) {
        divisions = divisions.filter(d => d.id !== id);
        displayDivisions();
        updateDivisionSelects();
        updateDashboard();
    }
}

function editDivision(id) {
    const division = divisions.find(d => d.id === id);
    if (!division) return;

    document.getElementById('divisionName').value = division.name;
    document.getElementById('divisionDesc').value = division.description;
    document.getElementById('divisionHead').value = division.head;

    showAddDivisionForm();
    deleteDivision(id);
}

function updateDivisionSelects() {
    const selects = [
        document.getElementById('memberDivision'),
        document.getElementById('activityDivision')
    ];

    selects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Pilih Divisi</option>';
        
        divisions.forEach(division => {
            const option = document.createElement('option');
            option.value = division.name;
            option.textContent = division.name;
            select.appendChild(option);
        });

        select.value = currentValue;
    });
}

// Activities Functions
function showAddActivityForm() {
    document.getElementById('addActivityForm').style.display = 'block';
    updateDivisionSelects();
}

function hideAddActivityForm() {
    document.getElementById('addActivityForm').style.display = 'none';
    document.getElementById('addActivityForm').querySelector('form').reset();
}

function addActivity(event) {
    event.preventDefault();

    const activity = {
        id: Date.now(),
        name: document.getElementById('activityName').value,
        description: document.getElementById('activityDesc').value,
        date: document.getElementById('activityDate').value,
        time: document.getElementById('activityTime').value,
        location: document.getElementById('activityLocation').value,
        division: document.getElementById('activityDivision').value
    };

    activities.push(activity);
    displayActivities();
    hideAddActivityForm();
    updateDashboard();
}

function displayActivities() {
    const activitiesList = document.getElementById('activitiesList');
    activitiesList.innerHTML = '';

    activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.innerHTML = `
            <h3>${activity.name}</h3>
            <p><strong>📅 Tanggal:</strong> ${formatDate(activity.date)}</p>
            <p><strong>⏰ Waktu:</strong> ${activity.time}</p>
            <p><strong>📍 Lokasi:</strong> ${activity.location}</p>
            <p><strong>🏛️ Divisi:</strong> ${activity.division}</p>
            <p>${activity.description}</p>
            <div class="card-actions">
                <button class="btn-edit" onclick="editActivity(${activity.id})">Edit</button>
                <button class="btn-danger" onclick="deleteActivity(${activity.id})">Hapus</button>
            </div>
        `;
        activitiesList.appendChild(card);
    });
}

function deleteActivity(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
        activities = activities.filter(a => a.id !== id);
        displayActivities();
        updateDashboard();
    }
}

function editActivity(id) {
    const activity = activities.find(a => a.id === id);
    if (!activity) return;

    document.getElementById('activityName').value = activity.name;
    document.getElementById('activityDesc').value = activity.description;
    document.getElementById('activityDate').value = activity.date;
    document.getElementById('activityTime').value = activity.time;
    document.getElementById('activityLocation').value = activity.location;
    document.getElementById('activityDivision').value = activity.division;

    showAddActivityForm();
    deleteActivity(id);
}

// Dashboard Functions
function updateDashboard() {
    // Update statistics
    document.getElementById('totalMembers').textContent = members.length;
    document.getElementById('totalDivisions').textContent = divisions.length;
    document.getElementById('totalActivities').textContent = activities.length;

    // Calculate upcoming activities
    const today = new Date();
    const upcoming = activities.filter(a => new Date(a.date) >= today);
    document.getElementById('upcomingActivities').textContent = upcoming.length;

    // Display upcoming activities
    displayUpcomingActivities();

    // Display members by division
    displayMembersByDivision();
}

function displayUpcomingActivities() {
    const upcomingList = document.getElementById('upcomingActivitiesList');
    upcomingList.innerHTML = '';

    const today = new Date();
    const upcoming = activities
        .filter(a => new Date(a.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    if (upcoming.length === 0) {
        upcomingList.innerHTML = '<p style="color: #6c757d;">Tidak ada kegiatan mendatang</p>';
        return;
    }

    upcoming.forEach(activity => {
        const div = document.createElement('div');
        div.className = 'upcoming-activity';
        div.innerHTML = `
            <h4>${activity.name}</h4>
            <p><strong>📅 Tanggal:</strong> ${formatDate(activity.date)} | <strong>⏰</strong> ${activity.time}</p>
            <p><strong>📍 Lokasi:</strong> ${activity.location}</p>
            <p><strong>🏛️ Divisi:</strong> ${activity.division}</p>
        `;
        upcomingList.appendChild(div);
    });
}

function displayMembersByDivision() {
    const container = document.getElementById('membersByDivision');
    container.innerHTML = '';

    if (divisions.length === 0) {
        container.innerHTML = '<p style="color: #6c757d;">Belum ada divisi</p>';
        return;
    }

    divisions.forEach(division => {
        const memberCount = members.filter(m => m.division === division.name).length;
        
        const div = document.createElement('div');
        div.className = 'division-stats';
        div.innerHTML = `
            <h4>${division.name}</h4>
            <p><strong>Ketua:</strong> ${division.head}</p>
            <p><span class="member-count">${memberCount} Anggota</span></p>
        `;
        container.appendChild(div);
    });
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function updateAllDisplays() {
    displayMembers();
    displayDivisions();
    displayActivities();
    updateDivisionSelects();
    updateDashboard();
}