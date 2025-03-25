document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const menuLinks = document.querySelectorAll('#sidebar a, #mobile-nav a');
    const pageTitle = document.getElementById('pageTitle');
    
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        content.classList.toggle('expanded');
        document.body.classList.toggle('overlay');
    });

    // Handle page navigation
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            menuLinks.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Select corresponding link in the other menu
            const page = this.getAttribute('data-page');
            const correspondingLinks = document.querySelectorAll(`a[data-page="${page}"]`);
            
            correspondingLinks.forEach(function(item) {
                item.classList.add('active');
            });
            
            // Update page title
            pageTitle.textContent = this.querySelector('span').textContent;
            
            // Show the corresponding content
            const pageContents = document.querySelectorAll('.page-content');
            pageContents.forEach(function(content) {
                content.classList.add('d-none');
            });
            
            document.getElementById(`${page}-content`).classList.remove('d-none');
            
            // Close sidebar on mobile when a link is clicked
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('overlay');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.body.classList.remove('overlay');
        }
    });

    // Close sidebar when clicking overlay
    document.body.addEventListener('click', function(e) {
        if (document.body.classList.contains('overlay') && 
            !sidebar.contains(e.target) && 
            !sidebarCollapse.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.classList.remove('overlay');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Revenue data with mock values
    const revenueData = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [{
            label: 'Monthly Revenue',
            data: [
                45670, 52340, 48900, 55600, 59800, 62300,
                65400, 68900, 63200, 59800, 57600, 64500
            ],
            borderColor: 'rgba(13, 110, 253, 0.7)',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    // Chart configuration
    const chartConfig = {
        type: 'line',
        data: revenueData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false,
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    callbacks: {
                        label: function(context) {
                            return `Revenue: $${context.parsed.y.toLocaleString()}`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Revenue ($)'
                    },
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    };

    // Create chart
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, chartConfig);

    // Timeframe selector
    const timeframeSelect = document.getElementById('chartTimeframe');
    const totalRevenueDisplay = document.getElementById('totalRevenueDisplay');
    const avgRevenueDisplay = document.getElementById('avgRevenueDisplay');
    const revenueGrowthDisplay = document.getElementById('revenueGrowthDisplay');

    timeframeSelect.addEventListener('change', function() {
        const months = parseInt(this.value);
        
        // Calculate slice of data based on selected timeframe
        const slicedLabels = revenueData.labels.slice(-months);
        const slicedData = revenueData.datasets[0].data.slice(-months);

        // Update chart data
        revenueChart.data.labels = slicedLabels;
        revenueChart.data.datasets[0].data = slicedData;
        revenueChart.update();

        // Update summary statistics
        const totalRevenue = slicedData.reduce((a, b) => a + b, 0);
        const avgRevenue = totalRevenue / slicedData.length;
        const lastMonthRevenue = slicedData[slicedData.length - 1];
        const prevMonthRevenue = slicedData[slicedData.length - 2];
        const growthPercentage = ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);

        totalRevenueDisplay.textContent = `$${totalRevenue.toLocaleString()}`;
        avgRevenueDisplay.textContent = `$${avgRevenue.toLocaleString()}`;
        revenueGrowthDisplay.textContent = `+${growthPercentage}%`;
    });

    // Responsive design for mobile
    function updateChartForMobileView() {
        if (window.innerWidth <= 768) {
            // Reduce number of x-axis ticks
            chartConfig.options.scales.x.ticks = {
                maxTicksLimit: 5
            };
            revenueChart.update();
        } else {
            // Reset x-axis ticks for desktop
            delete chartConfig.options.scales.x.ticks;
            revenueChart.update();
        }
    }

    // Initial mobile check
    updateChartForMobileView();

    // Update on window resize
    window.addEventListener('resize', updateChartForMobileView);
});

 // Sample user data
 const users = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'inactive' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Manager', status: 'active' },
    { name: 'Bob Brown', email: 'bob.brown@example.com', role: 'User', status: 'active' },
    { name: 'Charlie Davis', email: 'charlie.davis@example.com', role: 'User', status: 'inactive' },
    { name: 'Eva Wilson', email: 'eva.wilson@example.com', role: 'Admin', status: 'active' },
    { name: 'Frank Miller', email: 'frank.miller@example.com', role: 'User', status: 'inactive' },
    { name: 'Grace Lee', email: 'grace.lee@example.com', role: 'Manager', status: 'active' },
    { name: 'Henry Clark', email: 'henry.clark@example.com', role: 'User', status: 'active' },
    { name: 'Ivy Martinez', email: 'ivy.martinez@example.com', role: 'User', status: 'inactive' },
    { name: 'Jack Robinson', email: 'jack.robinson@example.com', role: 'Admin', status: 'active' }
];

class UserTable {
    constructor(users, itemsPerPage = 10) {
        this.users = users;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.sortKey = null;
        this.sortDirection = 'asc';

        this.tableBody = document.getElementById('userTableBody');
        this.paginationContainer = document.getElementById('pagination');

        this.init();
    }

    init() {
        this.addSortListeners();
        this.renderTable();
        this.renderPagination();
    }

    addSortListeners() {
        const sortableHeaders = document.querySelectorAll('.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortKey = header.getAttribute('data-sort');
                this.sortTable(sortKey);
            });
        });
    }

    sortTable(key) {
        // Toggle sort direction if same key is clicked
        if (this.sortKey === key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortKey = key;
            this.sortDirection = 'asc';
        }

        // Sort the users
        this.users.sort((a, b) => {
            if (a[key] < b[key]) return this.sortDirection === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.renderTable();
    }

    renderTable() {
        // Clear existing rows
        this.tableBody.innerHTML = '';

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedUsers = this.users.slice(startIndex, endIndex);

        // Render rows
        paginatedUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Name">${user.name}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="Role">${user.role}</td>
                <td data-label="Status">
                    <span class="status-badge status-${user.status}">
                        ${user.status}
                    </span>
                </td>
            `;
            this.tableBody.appendChild(row);
        });

        this.renderPagination();
    }

    renderPagination() {
        const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
        
        // Clear existing pagination
        this.paginationContainer.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        if (this.currentPage === 1) prevLi.classList.add('disabled');
        prevLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });
        this.paginationContainer.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (i === this.currentPage) li.classList.add('active');
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.renderTable();
            });
            this.paginationContainer.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        if (this.currentPage === totalPages) nextLi.classList.add('disabled');
        nextLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
            }
        });
        this.paginationContainer.appendChild(nextLi);
    }
}

// Initialize the user table
document.addEventListener('DOMContentLoaded', () => {
    new UserTable(users);
});