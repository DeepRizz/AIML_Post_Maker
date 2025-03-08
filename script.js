document.addEventListener('DOMContentLoaded', () => {
    const teamContainer = document.getElementById('team-container');
    const addMemberInput = document.getElementById('add-member');
    const downloadBtn = document.getElementById('download-post');
    const resetBtn = document.getElementById('reset');
    const teamPositionInput = document.getElementById('team-position');
    const teamQuoteInput = document.getElementById('team-quote');
    const themeSelect = document.getElementById('theme-select');
    const postContainer = document.getElementById('post-container');
    const logoLeftPlaceholder = document.getElementById('logo-left-placeholder');
    const logoRightPlaceholder = document.getElementById('logo-right-placeholder');
    const logoLeftUpload = document.getElementById('logo-left-upload');
    const logoRightUpload = document.getElementById('logo-right-upload');
    const logoScale = document.getElementById('logo-scale');
    const memberScale = document.getElementById('member-scale');
    
    let teamMembers = [];
    const MAX_MEMBERS = 4;
    
    // Logo click handlers - trigger file input
    logoLeftPlaceholder.addEventListener('click', () => {
        logoLeftUpload.click();
    });
    
    logoRightPlaceholder.addEventListener('click', () => {
        logoRightUpload.click();
    });
    
    // Handle left logo upload
    logoLeftUpload.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (!file.type.startsWith('image/')) {
                alert('Please upload image files only.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                // Load image to get dimensions
                const img = new Image();
                img.onload = () => {
                    // Calculate sizing to maintain aspect ratio within 100px container
                    const maxSize = 100;
                    const containerSize = 100;
                    
                    // Get original aspect ratio
                    const aspectRatio = img.width / img.height;
                    
                    // Calculate dimensions that maintain aspect ratio
                    let width, height;
                    if (aspectRatio >= 1) {
                        // Wider than tall
                        width = Math.min(maxSize, img.width);
                        height = width / aspectRatio;
                    } else {
                        // Taller than wide
                        height = Math.min(maxSize, img.height);
                        width = height * aspectRatio;
                    }
                    
                    // Center in container
                    const leftMargin = (containerSize - width) / 2;
                    const topMargin = (containerSize - height) / 2;
                    
                    const logoContainer = document.querySelector('.logo-left');
                    logoContainer.innerHTML = `
                        <div style="width: ${containerSize}px; height: ${containerSize}px; position: relative; display: flex; justify-content: center; align-items: center;">
                            <img 
                                src="${event.target.result}" 
                                alt="Left Logo" 
                                id="logo-left" 
                                crossorigin="anonymous"
                                data-original-width="${img.width}"
                                data-original-height="${img.height}"
                                data-aspect-ratio="${aspectRatio}"
                                style="
                                    width: ${width}px; 
                                    height: ${height}px; 
                                    object-fit: contain;
                                    position: absolute;
                                "
                            >
                        </div>
                    `;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle right logo upload
    logoRightUpload.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (!file.type.startsWith('image/')) {
                alert('Please upload image files only.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                // Load image to get dimensions
                const img = new Image();
                img.onload = () => {
                    // Calculate sizing to maintain aspect ratio within 100px container
                    const maxSize = 100;
                    const containerSize = 100;
                    
                    // Get original aspect ratio
                    const aspectRatio = img.width / img.height;
                    
                    // Calculate dimensions that maintain aspect ratio
                    let width, height;
                    if (aspectRatio >= 1) {
                        // Wider than tall
                        width = Math.min(maxSize, img.width);
                        height = width / aspectRatio;
                    } else {
                        // Taller than wide
                        height = Math.min(maxSize, img.height);
                        width = height * aspectRatio;
                    }
                    
                    // Center in container
                    const leftMargin = (containerSize - width) / 2;
                    const topMargin = (containerSize - height) / 2;
                    
                    const logoContainer = document.querySelector('.logo-right');
                    logoContainer.innerHTML = `
                        <div style="width: ${containerSize}px; height: ${containerSize}px; position: relative; display: flex; justify-content: center; align-items: center;">
                            <img 
                                src="${event.target.result}" 
                                alt="Right Logo" 
                                id="logo-right" 
                                crossorigin="anonymous"
                                data-original-width="${img.width}"
                                data-original-height="${img.height}"
                                data-aspect-ratio="${aspectRatio}"
                                style="
                                    width: ${width}px; 
                                    height: ${height}px; 
                                    object-fit: contain;
                                    position: absolute;
                                "
                            >
                        </div>
                    `;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Apply initial theme
    applyTheme('neural-network');
    
    // Theme selection handler
    themeSelect.addEventListener('change', () => {
        applyTheme(themeSelect.value);
    });
    
    function applyTheme(themeName) {
        postContainer.classList.remove(
            'theme-neural-network', 
            'theme-quantum-computing', 
            'theme-data-visualization', 
            'theme-cybernetic',
            'theme-deep-learning',
            'theme-circuit'
        );
        
        postContainer.classList.add(`theme-${themeName}`);
    }
    
    addMemberInput.addEventListener('change', (e) => {
        const files = e.target.files;
        
        if (teamMembers.length + files.length > MAX_MEMBERS) {
            alert(`You can only add up to ${MAX_MEMBERS} team members.`);
            return;
        }
        
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert('Please upload image files only.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const memberName = prompt('Enter team member name:');
                const memberPosition = prompt('Enter team member position:');
                
                if (memberName) {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        teamMembers.push({
                            image: event.target.result,
                            name: memberName,
                            position: memberPosition || 'Member',
                            width: img.width,
                            height: img.height
                        });
                        
                        renderTeamMembers();
                    };
                    img.src = event.target.result;
                }
            };
            reader.readAsDataURL(file);
        });
        
        addMemberInput.value = '';
    });
    
    // Add scale value display updates
    logoScale.nextElementSibling.textContent = logoScale.value + '%';
    memberScale.nextElementSibling.textContent = memberScale.value + '%';
    
    // Logo scaling handler
    logoScale.addEventListener('input', (e) => {
        const scale = e.target.value / 100;
        e.target.nextElementSibling.textContent = e.target.value + '%';
        
        const leftLogo = document.querySelector('#logo-left');
        const rightLogo = document.querySelector('#logo-right');
        
        [leftLogo, rightLogo].forEach(logo => {
            if (logo) {
                const originalWidth = logo.getAttribute('data-original-width');
                const originalHeight = logo.getAttribute('data-original-height');
                const aspectRatio = parseFloat(logo.getAttribute('data-aspect-ratio'));
                
                if (aspectRatio) {
                    let width, height;
                    if (aspectRatio >= 1) {
                        width = Math.min(100 * scale, originalWidth);
                        height = width / aspectRatio;
                    } else {
                        height = Math.min(100 * scale, originalHeight);
                        width = height * aspectRatio;
                    }
                    
                    logo.style.width = `${width}px`;
                    logo.style.height = `${height}px`;
                }
            }
        });
    });
    
    // Member images scaling handler
    memberScale.addEventListener('input', (e) => {
        const scale = e.target.value / 100;
        e.target.nextElementSibling.textContent = e.target.value + '%';
        renderTeamMembers(scale);
    });
    
    function renderTeamMembers(scale = 1) {
        teamContainer.innerHTML = '';
        
        teamContainer.className = 'team-container members-' + teamMembers.length;
        
        const membersContainer = document.createElement('div');
        membersContainer.className = 'members-grid';
        membersContainer.style.display = 'grid';
        membersContainer.style.gridTemplateColumns = teamMembers.length === 3 ? 'repeat(3, 1fr)' : 
                                                   teamMembers.length === 2 ? 'repeat(2, 1fr)' :
                                                   teamMembers.length === 4 ? 'repeat(2, 1fr)' : '1fr';
        membersContainer.style.gap = '20px';
        membersContainer.style.width = '100%';
        
        teamMembers.forEach((member, index) => {
            const memberElement = document.createElement('div');
            memberElement.className = 'member';
            
            // Calculate scaled dimensions
            const img = new Image();
            img.src = member.image;
            const aspectRatio = member.width / member.height;
            let width, height;
            
            if (aspectRatio >= 1) {
                width = Math.min(member.width, 300) * scale;
                height = width / aspectRatio;
            } else {
                height = Math.min(member.height, 300) * scale;
                width = height * aspectRatio;
            }
            
            memberElement.innerHTML = `
                <div class="member-img" style="height: ${height}px;">
                    <img 
                        src="${member.image}" 
                        alt="${member.name}" 
                        title="Original size: ${member.width}x${member.height}px" 
                        crossorigin="anonymous"
                        style="width: ${width}px; height: ${height}px;"
                    >
                </div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-position">${member.position}</div>
                </div>
                <button class="remove-member" data-index="${index}">✕</button>
            `;
            
            membersContainer.appendChild(memberElement);
        });
        
        teamContainer.appendChild(membersContainer);
        
        // Add quote element if there's text in the quote input
        const quoteText = teamQuoteInput.value.trim();
        if (quoteText) {
            const quoteElement = document.createElement('div');
            quoteElement.className = 'team-quote';
            quoteElement.innerHTML = `
                <div class="quote-text">${quoteText}</div>
            `;
            teamContainer.appendChild(quoteElement);
        }
        
        document.querySelectorAll('.remove-member').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                teamMembers.splice(index, 1);
                renderTeamMembers();
            });
        });
        
        if (!document.getElementById('remove-button-style')) {
            const style = document.createElement('style');
            style.id = 'remove-button-style';
            style.textContent = `
                .remove-member {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: rgba(255, 0, 0, 0.7);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .member:hover .remove-member {
                    opacity: 1;
                }
                
                .remove-member:hover {
                    background-color: rgba(255, 0, 0, 0.9);
                }
                
                .team-quote {
                    width: 100%;
                    text-align: center;
                    padding: 15px 20px;
                    margin-top: 30px;
                    margin-bottom: 10px;
                    font-size: 24px;
                    font-weight: bold;
                    font-family: 'Exo 2', sans-serif;
                    color: rgba(255, 255, 255, 0.9);
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 10px;
                    letter-spacing: 1px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    font-style: italic;
                }
                
                .quote-text:before {
                    content: '"';
                    font-size: 32px;
                    margin-right: 5px;
                }
                
                .quote-text:after {
                    content: '"';
                    font-size: 32px;
                    margin-left: 5px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    downloadBtn.addEventListener('click', () => {
        if (teamMembers.length === 0) {
            alert('Please add at least one team member before downloading.');
            return;
        }
        
        if (!window.html2canvas) {
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = captureAndDownload;
            document.head.appendChild(script);
        } else {
            captureAndDownload();
        }
    });
    
    function captureAndDownload() {
        document.querySelector('.controls-panel').style.display = 'none';
        
        const originalPost = document.querySelector('.post-container');
        const clonedPost = originalPost.cloneNode(true);
        clonedPost.style.position = 'absolute';
        clonedPost.style.left = '-9999px';
        document.body.appendChild(clonedPost);
        
        // Set proper attributes for all images and ensure aspect ratios are maintained
        clonedPost.querySelectorAll('img').forEach(img => {
            img.crossOrigin = "anonymous";
            
            // Preserve logo aspect ratios if available
            if (img.id === 'logo-left' || img.id === 'logo-right') {
                // Get the aspect ratio data if it exists
                const aspectRatio = img.getAttribute('data-aspect-ratio');
                const originalWidth = img.getAttribute('data-original-width');
                const originalHeight = img.getAttribute('data-original-height');
                
                // If we have the aspect ratio info, use it
                if (aspectRatio) {
                    // Keep the exact same dimensions as in the display
                    // The container is already handling proper sizing and centering
                }
            }
            
            // Add error handling
            img.onerror = function() {
                console.error(`Failed to render image: ${img.src}`);
                
                // Get which side this logo is on based on ID
                let isLeftLogo = img.id === 'logo-left';
                let isLogo = isLeftLogo || img.id === 'logo-right';
                
                const fallbackDiv = document.createElement('div');
                fallbackDiv.style.width = '100%';
                fallbackDiv.style.height = '100%';
                fallbackDiv.style.display = 'flex';
                fallbackDiv.style.justifyContent = 'center';
                fallbackDiv.style.alignItems = 'center';
                
                if (isLogo) {
                    fallbackDiv.style.backgroundColor = isLeftLogo ? '#0088ff' : '#8800ff';
                    fallbackDiv.style.borderRadius = '10px';
                    fallbackDiv.textContent = isLeftLogo ? 'AIML CLUB' : 'CHARUSAT';
                } else {
                    fallbackDiv.style.backgroundColor = '#333';
                    fallbackDiv.textContent = img.alt || 'Image';
                }
                
                fallbackDiv.style.color = 'white';
                fallbackDiv.style.fontFamily = 'Orbitron, sans-serif';
                fallbackDiv.style.fontSize = '14px';
                
                // Check if parentNode exists before replacing
                if (img.parentNode) {
                    img.parentNode.replaceChild(fallbackDiv, img);
                } else {
                    console.error('Parent node not found for image during capture:', img.src);
                }
            };
        });
        
        const teamPosition = teamPositionInput.value;
        const subHeadingContainer = clonedPost.querySelector('.sub-heading');
        
        if (teamPosition) {
            subHeadingContainer.innerHTML = `<h2>${teamPosition}</h2>`;
        } else {
            subHeadingContainer.innerHTML = `<h2>AIML Club Team</h2>`;
        }
        
        const tempStyle = document.createElement('style');
        tempStyle.textContent = `
            .sub-heading h2 {
                font-family: 'Orbitron', sans-serif;
                font-size: 28px;
                color: rgba(0, 200, 255, 0.9);
                margin: 0;
                padding: 10px 0;
                text-align: center;
            }
            
            .theme-quantum-computing .sub-heading h2 {
                font-family: 'Exo 2', sans-serif;
                color: rgba(64, 224, 208, 0.9);
            }
            
            .theme-data-visualization .sub-heading h2 {
                font-family: 'Rajdhani', sans-serif;
                color: rgba(78, 146, 237, 0.9);
            }
            
            .theme-cybernetic .sub-heading h2 {
                font-family: 'Audiowide', sans-serif;
                color: rgba(255, 110, 0, 0.9);
            }
            
            .theme-deep-learning .sub-heading h2 {
                font-family: 'Quicksand', sans-serif;
                font-weight: 700;
                color: rgba(127, 0, 255, 0.9);
            }
            
            .theme-circuit .sub-heading h2 {
                font-family: 'Orbitron', sans-serif;
                color: rgba(50, 205, 50, 0.9);
            }
        `;
        document.head.appendChild(tempStyle);
        
        // Wait a bit longer to ensure images are properly loaded
        setTimeout(() => {
            html2canvas(clonedPost, {
                backgroundColor: getComputedStyle(postContainer).backgroundColor,
                scale: 2,
                logging: true,
                useCORS: true,
                allowTaint: true,
                imageTimeout: 0, // Wait for all images to load
                onclone: function(documentClone) {
                    const clonedContainer = documentClone.querySelector('.post-container');
                    if (clonedContainer) {
                        clonedContainer.style.transform = 'none';
                    }
                }
            }).then(canvas => {
                try {
                    const link = document.createElement('a');
                    link.download = 'aiml-team-post.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                } catch (error) {
                    console.error("Error generating image:", error);
                    alert("There was an error generating the image. This may be due to security restrictions with local images. Try using web-hosted images instead.");
                } finally {
                    document.querySelector('.controls-panel').style.display = 'flex';
                    document.body.removeChild(clonedPost);
                    document.head.removeChild(tempStyle);
                }
            }).catch(error => {
                console.error("Canvas rendering error:", error);
                alert("There was an error generating the image. This may be due to security restrictions with local images.");
                document.querySelector('.controls-panel').style.display = 'flex';
                document.body.removeChild(clonedPost);
                document.head.removeChild(tempStyle);
            });
        }, 500); // Increased timeout to ensure all images are fully loaded
    }
    
    // Add event listener for quote input changes
    teamQuoteInput.addEventListener('input', (e) => {
        console.log('Quote input changed:', e.target.value); // Add logging
        renderTeamMembers();
    });
    
    // Also add a focus event listener to ensure the input is working
    teamQuoteInput.addEventListener('focus', () => {
        console.log('Quote input focused');
    });
    
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset? This will remove all team members.')) {
            teamMembers = [];
            teamPositionInput.value = '';
            teamQuoteInput.value = '';
            
            // Reset logos too
            document.querySelector('.logo-left').innerHTML = `
                <div class="logo-placeholder" id="logo-left-placeholder" style="width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;">
                    <span>Left Logo</span>
                </div>
            `;
            document.querySelector('.logo-right').innerHTML = `
                <div class="logo-placeholder" id="logo-right-placeholder" style="width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;">
                    <span>Right Logo</span>
                </div>
            `;
            
            // Re-attach click events to new placeholders
            document.getElementById('logo-left-placeholder').addEventListener('click', () => {
                logoLeftUpload.click();
            });
            
            document.getElementById('logo-right-placeholder').addEventListener('click', () => {
                logoRightUpload.click();
            });
            
            renderTeamMembers();
        }
    });
    
    // Initial render
    renderTeamMembers();
    
    // Add window resize handler for better mobile experience
    window.addEventListener('resize', adjustForMobile);
    
    // Initial check
    adjustForMobile();
    
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 576;
        
        if (isMobile) {
            if (teamMembers.length === 3) {
                teamContainer.classList.remove('members-3');
                teamContainer.classList.add('members-3-mobile');
            }
        } else {
            teamContainer.classList.remove('members-3-mobile');
            if (teamMembers.length === 3) {
                teamContainer.classList.add('members-3');
            }
        }
    }
});
