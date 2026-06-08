// ============================================================================
// SRI BHASKAR NURSERY — PREMIUM PLANT FINDER & DYNAMIC INVENTORY SEARCH ENGINE
// ============================================================================

const PlantFinder = {
    // Current Active Filters
    filters: {
        search: "",
        category: "All",
        sunlight: "All",
        water: "All",
        priceRange: "All"
    },

    // Initialize Plant Finder
    init() {
        this.injectStyles();
        this.renderPlantFinder();
    },

    // Inject dedicated modern CSS for the Finder
    injectStyles() {
        if (document.getElementById("plant-finder-styles")) return;

        const styles = document.createElement("style");
        styles.id = "plant-finder-styles";
        styles.textContent = `
            .finder-container {
                background: linear-gradient(135deg, rgba(244, 241, 234, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.8);
                border-radius: var(--radius-lg);
                padding: 30px;
                box-shadow: var(--shadow-md);
                margin-bottom: 40px;
            }

            .finder-title-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                flex-wrap: wrap;
                gap: 15px;
            }

            .finder-stats {
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--primary);
                background: rgba(63, 163, 77, 0.1);
                padding: 6px 16px;
                border-radius: 50px;
                border: 1px solid rgba(63, 163, 77, 0.2);
            }

            .finder-controls {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
                gap: 15px;
                align-items: center;
            }

            @media (max-width: 992px) {
                .finder-controls {
                    grid-template-columns: 1fr 1fr;
                }
                .finder-controls *:first-child {
                    grid-column: span 2;
                }
            }

            @media (max-width: 576px) {
                .finder-controls {
                    grid-template-columns: 1fr;
                }
                .finder-controls *:first-child {
                    grid-column: span 1;
                }
            }

            .finder-search-wrap {
                position: relative;
                width: 100%;
            }

            .finder-search-input {
                width: 100%;
                padding: 14px 20px 14px 45px;
                border-radius: 30px;
                border: 1.5px solid #ddd;
                font-size: 0.95rem;
                outline: none;
                transition: var(--transition);
                font-family: inherit;
            }

            .finder-search-input:focus {
                border-color: var(--primary-light);
                box-shadow: 0 0 10px rgba(63, 163, 77, 0.15);
            }

            .finder-search-icon {
                position: absolute;
                left: 18px;
                top: 50%;
                transform: translateY(-50%);
                color: #888;
                font-size: 1rem;
            }

            .finder-select {
                padding: 14px 20px;
                border-radius: 30px;
                border: 1.5px solid #ddd;
                font-size: 0.9rem;
                outline: none;
                background-color: var(--white);
                cursor: pointer;
                transition: var(--transition);
                width: 100%;
                font-family: inherit;
                appearance: none;
                -webkit-appearance: none;
                background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
                background-repeat: no-repeat;
                background-position: right 18px center;
                background-size: 16px;
            }

            .finder-select:focus {
                border-color: var(--primary-light);
            }

            /* Live Pill Badges */
            .finder-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 15px;
            }

            .finder-badge {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--white);
                border: 1px solid #ddd;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 0.82rem;
                font-weight: 500;
                color: #555;
            }

            .finder-badge i {
                cursor: pointer;
                color: #999;
                transition: var(--transition);
            }

            .finder-badge i:hover {
                color: #ff3333;
            }

            .finder-clear-btn {
                background: none;
                border: none;
                color: #ff4d4d;
                font-size: 0.82rem;
                font-weight: 600;
                cursor: pointer;
                padding: 6px 12px;
                transition: var(--transition);
            }

            .finder-clear-btn:hover {
                text-decoration: underline;
            }

            /* Dynamic Cards layout override */
            .finder-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 30px;
                margin-top: 30px;
                transition: opacity 0.25s ease;
            }

            .finder-card-actions {
                display: grid;
                grid-template-columns: 1fr;
                gap: 8px;
                margin-top: 15px;
            }

            .finder-btn-whatsapp {
                background: #25D366;
                color: #fff;
                border: none;
                padding: 10px;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                cursor: pointer;
                transition: var(--transition);
                box-shadow: 0 4px 10px rgba(37, 211, 102, 0.15);
            }

            .finder-btn-whatsapp:hover {
                background: #1eb956;
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(37, 211, 102, 0.25);
            }

            .finder-btn-quickview {
                background: #f0f2f5;
                color: #111;
                border: 1px solid #ddd;
                padding: 10px;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            }

            .finder-btn-quickview:hover {
                background: #e4e6eb;
            }

            .finder-no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                background: var(--bg-light);
                border-radius: var(--radius-md);
                border: 1.5px dashed #ccc;
            }

            .finder-no-results i {
                font-size: 3rem;
                color: #bbb;
                margin-bottom: 15px;
            }
        `;
        document.body.appendChild(styles);
    },

    // Render plant finder UI structure inside the targets
    renderPlantFinder() {
        // Find targets
        const homeRoot = document.getElementById("plant-finder-root");
        const categoryInventory = document.querySelector("#inventory .container");

        if (homeRoot) {
            // Render inside Home varieties
            this.buildFinderMarkup(homeRoot, "Home");
        } else if (categoryInventory) {
            // Determine default category based on current page filename
            const currentFilename = window.location.pathname.split("/").pop() || "index.html";
            if (currentFilename.includes("outdoor")) this.filters.category = "Outdoor";
            else if (currentFilename.includes("indoor")) this.filters.category = "Indoor";
            else if (currentFilename.includes("fruit")) this.filters.category = "Fruit";
            else if (currentFilename.includes("ornamental")) this.filters.category = "Ornamental";
            else if (currentFilename.includes("avenue")) this.filters.category = "Avenue";

            // Clear absolute empty grid and build finder markup
            const gridDiv = categoryInventory.querySelector("div[style*='grid']");
            if (gridDiv) gridDiv.remove();

            const targetWrapper = document.createElement("div");
            targetWrapper.id = "plant-finder-root-cat";
            categoryInventory.appendChild(targetWrapper);

            this.buildFinderMarkup(targetWrapper, "Category");
        }
    },

    buildFinderMarkup(targetEl, mode) {
        targetEl.innerHTML = `
            <div class="finder-container">
                <div class="finder-title-row">
                    <h3 style="font-family:'Outfit'; font-size:1.4rem; color:var(--primary); margin:0;"><i class="fas fa-search-plus"></i> Instant Plant Finder</h3>
                    <div class="finder-stats" id="finder-count-label">Showing all plants</div>
                </div>
                
                <div class="finder-controls">
                    <!-- Search Field -->
                    <div class="finder-search-wrap">
                        <i class="fas fa-search finder-search-icon"></i>
                        <input type="text" class="finder-search-input" id="finder-search-field" placeholder="Search plant names, scientific names, keywords..." value="${this.filters.search}">
                    </div>

                    <!-- Category Filter -->
                    <select class="finder-select" id="finder-filter-category" ${mode === "Category" ? "disabled" : ""}>
                        <option value="All" ${this.filters.category === "All" ? "selected" : ""}>Category: All</option>
                        <option value="Indoor" ${this.filters.category === "Indoor" ? "selected" : ""}>Indoor Plants</option>
                        <option value="Outdoor" ${this.filters.category === "Outdoor" ? "selected" : ""}>Outdoor Plants</option>
                        <option value="Fruit" ${this.filters.category === "Fruit" ? "selected" : ""}>Fruit Plants</option>
                        <option value="Ornamental" ${this.filters.category === "Ornamental" ? "selected" : ""}>Ornamental Plants</option>
                        <option value="Avenue" ${this.filters.category === "Avenue" ? "selected" : ""}>Avenue Trees</option>
                    </select>

                    <!-- Sunlight Filter -->
                    <select class="finder-select" id="finder-filter-sunlight">
                        <option value="All" ${this.filters.sunlight === "All" ? "selected" : ""}>Sunlight: All</option>
                        <option value="Full Sun" ${this.filters.sunlight === "Full Sun" ? "selected" : ""}>Full Direct Sun</option>
                        <option value="Bright Indirect" ${this.filters.sunlight === "Bright Indirect" ? "selected" : ""}>Bright Indirect</option>
                        <option value="Low Light" ${this.filters.sunlight === "Low Light" ? "selected" : ""}>Low / Shade</option>
                    </select>

                    <!-- Watering Filter -->
                    <select class="finder-select" id="finder-filter-water">
                        <option value="All" ${this.filters.water === "All" ? "selected" : ""}>Watering: All</option>
                        <option value="Low" ${this.filters.water === "Low" ? "selected" : ""}>Low Watering</option>
                        <option value="Moderate" ${this.filters.water === "Moderate" ? "selected" : ""}>Moderate</option>
                        <option value="Regular" ${this.filters.water === "Regular" ? "selected" : ""}>Regular/Daily</option>
                    </select>

                    <!-- Price Filter -->
                    <select class="finder-select" id="finder-filter-price">
                        <option value="All" ${this.filters.priceRange === "All" ? "selected" : ""}>Price: All</option>
                        <option value="Under200" ${this.filters.priceRange === "Under200" ? "selected" : ""}>Under ₹200</option>
                        <option value="200to500" ${this.filters.priceRange === "200to500" ? "selected" : ""}>₹200 - ₹500</option>
                        <option value="Over500" ${this.filters.priceRange === "Over500" ? "selected" : ""}>Over ₹500</option>
                    </select>
                </div>

                <!-- Active Pill Badges -->
                <div class="finder-badges" id="finder-pill-box">
                    <!-- Loaded dynamically -->
                </div>
            </div>

            <!-- Dynamic Matched Grid -->
            <div class="finder-grid" id="finder-plant-grid">
                <!-- Plant cards dynamically rendered -->
            </div>
        `;

        this.bindEvents(targetEl);
        this.filterAndRender();
    },

    // Bind real-time input and change listeners
    bindEvents(containerEl) {
        const searchField = containerEl.querySelector("#finder-search-field");
        const categoryFilter = containerEl.querySelector("#finder-filter-category");
        const sunlightFilter = containerEl.querySelector("#finder-filter-sunlight");
        const waterFilter = containerEl.querySelector("#finder-filter-water");
        const priceFilter = containerEl.querySelector("#finder-filter-price");

        searchField.addEventListener("input", (e) => {
            this.filters.search = e.target.value.trim();
            this.filterAndRender();
        });

        categoryFilter.addEventListener("change", (e) => {
            this.filters.category = e.target.value;
            this.filterAndRender();
        });

        sunlightFilter.addEventListener("change", (e) => {
            this.filters.sunlight = e.target.value;
            this.filterAndRender();
        });

        waterFilter.addEventListener("change", (e) => {
            this.filters.water = e.target.value;
            this.filterAndRender();
        });

        priceFilter.addEventListener("change", (e) => {
            this.filters.priceRange = e.target.value;
            this.filterAndRender();
        });
    },

    // Core Filtering Engine
    filterAndRender() {
        const grid = document.getElementById("finder-plant-grid");
        const countLabel = document.getElementById("finder-count-label");
        const pillBox = document.getElementById("finder-pill-box");

        if (!grid) return;

        // Apply filters against global database
        const matches = PRODUCTS_DB.filter(p => {
            // 1. Search Query Match
            const sQuery = this.filters.search.toLowerCase();
            const matchesSearch = !sQuery || 
                                 p.name.toLowerCase().includes(sQuery) ||
                                 p.category.toLowerCase().includes(sQuery) ||
                                 (p.scientificName && p.scientificName.toLowerCase().includes(sQuery)) ||
                                 (p.desc && p.desc.toLowerCase().includes(sQuery));

            // 2. Category Match
            const matchesCat = this.filters.category === "All" || p.category === this.filters.category;

            // 3. Sunlight Match
            let matchesSun = true;
            if (this.filters.sunlight !== "All") {
                const sunlightText = p.sunlight ? p.sunlight.toLowerCase() : "";
                if (this.filters.sunlight === "Full Sun") {
                    matchesSun = sunlightText.includes("full sun") || sunlightText.includes("direct sun") || sunlightText.includes("intense sun");
                } else if (this.filters.sunlight === "Bright Indirect") {
                    matchesSun = sunlightText.includes("indirect") || sunlightText.includes("filtered");
                } else if (this.filters.sunlight === "Low Light") {
                    matchesSun = sunlightText.includes("low") || sunlightText.includes("shade");
                }
            }

            // 4. Watering Match
            let matchesWater = true;
            if (this.filters.water !== "All") {
                const waterText = p.watering ? p.watering.toLowerCase() : "";
                if (this.filters.water === "Low") {
                    matchesWater = waterText.includes("low") || waterText.includes("2-3 weeks") || waterText.includes("dry completely");
                } else if (this.filters.water === "Moderate") {
                    matchesWater = waterText.includes("moderate") || waterText.includes("once a week") || waterText.includes("10-14 days") || waterText.includes("7-10 days");
                } else if (this.filters.water === "Regular") {
                    matchesWater = waterText.includes("twice a week") || waterText.includes("daily") || waterText.includes("damp") || waterText.includes("moist") || waterText.includes("regular");
                }
            }

            // 5. Price Match
            let matchesPrice = true;
            if (this.filters.priceRange !== "All") {
                if (this.filters.priceRange === "Under200") {
                    matchesPrice = p.price < 200;
                } else if (this.filters.priceRange === "200to500") {
                    matchesPrice = p.price >= 200 && p.price <= 500;
                } else if (this.filters.priceRange === "Over500") {
                    matchesPrice = p.price > 500;
                }
            }

            return matchesSearch && matchesCat && matchesSun && matchesWater && matchesPrice;
        });

        // Update Label
        countLabel.textContent = `Found ${matches.length} healthy plant${matches.length === 1 ? '' : 's'}`;

        // Render Pills
        this.renderPills(pillBox);

        // Render Cards
        if (matches.length === 0) {
            grid.innerHTML = `
                <div class="finder-no-results">
                    <i class="fas fa-seedling"></i>
                    <h4 style="font-family:'Outfit'; font-size:1.2rem; color:#444; margin-bottom:5px;">No plants match your filters</h4>
                    <p style="font-size:0.88rem; color:#888; max-width:400px; margin:0 auto 15px;">We have hundreds of varieties. Try resetting your active filters or search for another keyword like 'ZZ' or 'Palm'!</p>
                    <button class="btn btn-primary" style="padding:10px 24px; font-size:0.85rem;" onclick="PlantFinder.clearAllFilters()">Reset Filters</button>
                </div>
            `;
        } else {
            grid.innerHTML = matches.map(p => {
                let starHtml = "";
                const fullStars = Math.floor(p.rating);
                for(let i=0; i<5; i++) {
                    if (i < fullStars) starHtml += `<i class="fas fa-star" style="color:var(--amz-yellow); font-size:0.75rem;"></i>`;
                    else starHtml += `<i class="far fa-star" style="color:#ccc; font-size:0.75rem;"></i>`;
                }

                // Construct customized click-to-chat WhatsApp link
                const waMessage = encodeURIComponent(`Hi Sri Bhaskar Nursery, I am interested in bulk wholesale price details for "${p.name}" (${p.scientificName || 'Botanical Grafts'}). Please share the price list and availability.`);
                const waLink = `https://wa.me/919885533297?text=${waMessage}`;

                return `
                    <div class="plant-card" style="box-shadow: 0 4px 10px rgba(0,0,0,0.04); transition: transform 0.25s ease;">
                        <div class="plant-img" style="cursor:pointer;" onclick="AmazonStore.openProductModal('${p.id}')">
                            <img src="${p.img}" alt="${p.name}" onerror="this.src='logo.jpg'">
                            <span class="plant-badge">${p.category}</span>
                            ${p.prime ? `<span style="position:absolute; top:15px; right:15px; background:var(--primary); color:#fff; font-size:0.65rem; font-weight:800; padding:4px 10px; border-radius:50px; text-transform:uppercase;"><i class="fas fa-bolt" style="color:var(--accent);"></i> Prime</span>` : ''}
                        </div>
                        <div class="plant-info">
                            <h3 style="cursor:pointer; font-size:1.15rem;" onclick="AmazonStore.openProductModal('${p.id}')">${p.name}</h3>
                            ${p.scientificName ? `<div style="font-size:0.75rem; font-style:italic; color:#888; margin-top:-6px; margin-bottom:10px;">${p.scientificName}</div>` : ''}
                            
                            <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
                                ${starHtml}
                                <span style="font-size:0.75rem; color:var(--amz-link); font-weight:600;">(${p.reviews})</span>
                            </div>

                            <p style="font-size:0.82rem; line-height:1.4; color:#666; margin-bottom:15px;">${p.desc.substring(0, 95)}...</p>
                            
                            <div style="font-size:0.78rem; color:#555; background:rgba(0,0,0,0.03); padding:8px 12px; border-radius:6px; margin-bottom:15px; display:flex; flex-direction:column; gap:4px;">
                                <span><i class="fas fa-sun" style="color:#d4af37; width:14px;"></i> ${p.sunlight || 'Full/Partial Sun'}</span>
                                <span><i class="fas fa-tint" style="color:#3498db; width:14px;"></i> ${p.watering ? p.watering.split('(')[0] : 'Normal Watering'}</span>
                            </div>

                            <div class="plant-price" style="margin-top:auto !important; border-top:1px solid #eee; padding-top:12px; margin-bottom:12px;">
                                <div>
                                    <span style="font-size:1.2rem; font-weight:800; color:var(--primary);">₹${p.price}</span>
                                    <span style="text-decoration:line-through; font-size:0.75rem; color:#777; margin-left:6px;">₹${p.oldPrice}</span>
                                </div>
                            </div>
                            
                            <div class="finder-card-actions">
                                <a href="${waLink}" target="_blank" class="finder-btn-whatsapp">
                                    <i class="fab fa-whatsapp"></i> Inquire Bulk Price
                                </a>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                                    <button class="finder-btn-quickview" onclick="AmazonStore.openProductModal('${p.id}')">
                                        View Details
                                    </button>
                                    <button class="amz-btn-buybox amz-btn-add" style="padding:10px; font-size:0.8rem; font-weight:700; border-radius:6px; border:none;" onclick="AmazonStore.addToCartFromCard('${p.id}', this, event)">
                                        + Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    // Render badge indicators for currently active filters
    renderPills(containerEl) {
        if (!containerEl) return;

        let pillsHtml = "";
        let activeCount = 0;

        if (this.filters.search) {
            pillsHtml += `<span class="finder-badge">Search: "${this.filters.search}" <i class="fas fa-times-circle" onclick="PlantFinder.clearFilter('search')"></i></span>`;
            activeCount++;
        }
        if (this.filters.category !== "All") {
            pillsHtml += `<span class="finder-badge">Type: ${this.filters.category} <i class="fas fa-times-circle" onclick="PlantFinder.clearFilter('category')"></i></span>`;
            activeCount++;
        }
        if (this.filters.sunlight !== "All") {
            pillsHtml += `<span class="finder-badge">Sunlight: ${this.filters.sunlight} <i class="fas fa-times-circle" onclick="PlantFinder.clearFilter('sunlight')"></i></span>`;
            activeCount++;
        }
        if (this.filters.water !== "All") {
            pillsHtml += `<span class="finder-badge">Watering: ${this.filters.water} <i class="fas fa-times-circle" onclick="PlantFinder.clearFilter('water')"></i></span>`;
            activeCount++;
        }
        if (this.filters.priceRange !== "All") {
            let label = "";
            if (this.filters.priceRange === "Under200") label = "Under ₹200";
            else if (this.filters.priceRange === "200to500") label = "₹200 - ₹500";
            else if (this.filters.priceRange === "Over500") label = "Over ₹500";
            
            pillsHtml += `<span class="finder-badge">Price: ${label} <i class="fas fa-times-circle" onclick="PlantFinder.clearFilter('priceRange')"></i></span>`;
            activeCount++;
        }

        if (activeCount > 0) {
            pillsHtml += `<button class="finder-clear-btn" onclick="PlantFinder.clearAllFilters()">Clear All Filters</button>`;
        }

        containerEl.innerHTML = pillsHtml;
    },

    clearFilter(type) {
        if (type === "search") {
            this.filters.search = "";
            const f = document.getElementById("finder-search-field");
            if (f) f.value = "";
        } else if (type === "category") {
            this.filters.category = "All";
            const f = document.getElementById("finder-filter-category");
            if (f) f.value = "All";
        } else if (type === "sunlight") {
            this.filters.sunlight = "All";
            const f = document.getElementById("finder-filter-sunlight");
            if (f) f.value = "All";
        } else if (type === "water") {
            this.filters.water = "All";
            const f = document.getElementById("finder-filter-water");
            if (f) f.value = "All";
        } else if (type === "priceRange") {
            this.filters.priceRange = "All";
            const f = document.getElementById("finder-filter-price");
            if (f) f.value = "All";
        }
        this.filterAndRender();
    },

    clearAllFilters() {
        this.filters.search = "";
        this.filters.category = "All";
        this.filters.sunlight = "All";
        this.filters.water = "All";
        this.filters.priceRange = "All";

        // Reset DOM Controls
        const sf = document.getElementById("finder-search-field");
        if (sf) sf.value = "";
        const cf = document.getElementById("finder-filter-category");
        if (cf) cf.value = "All";
        const slf = document.getElementById("finder-filter-sunlight");
        if (slf) slf.value = "All";
        const wf = document.getElementById("finder-filter-water");
        if (wf) wf.value = "All";
        const pf = document.getElementById("finder-filter-price");
        if (pf) pf.value = "All";

        this.filterAndRender();
    }
};

// Auto Initialize
document.addEventListener("DOMContentLoaded", () => {
    PlantFinder.init();
});
