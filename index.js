const drawContainer = (containerSize, childSize, numberOfChildren) => {
    // Create the main container element
    const container = document.getElementById('mainSquare');
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
    container.style.position = 'relative'; // Position relative for child positioning
    container.style.overflow = 'hidden'; // Hide scrollbars if children exceed container

    // Calculate the maximum number of children that can fit
    const maxColumns = Math.floor(containerSize / childSize);
    const maxRows = Math.floor(containerSize / childSize);
    const maxChildren = maxColumns * maxRows;
    
    // Calculate the actual number of children to create
    const actualNumberOfChildren = Math.min(numberOfChildren, maxChildren);

     // Function to generate a random color for children's background
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

     // Array to store child elements
    const children = [];
    let childCount = 0;

    // Create child elements and add them to the container
    for (let row = 0; row < maxRows; row++) {
        for (let column = 0; column < maxColumns; column++) {
            if (childCount >= actualNumberOfChildren) {
                break; // Stop creating children if we reach the specified number
            }

            // Create a child element
            const child = document.createElement('div');
            child.style.width = `${childSize}px`;
            child.style.height = `${childSize}px`;
            child.style.position = 'absolute';
            child.style.backgroundColor = getRandomColor();
            child.style.left = `${column * childSize}px`;
            child.style.top = `${row * childSize}px`;

            // Event listener for hover effects (changing background and disappearance)
            child.addEventListener('mouseenter', () => {
                child.style.backgroundColor = getRandomColor();
                const hoverTimeout = setTimeout(() => {
                    child.style.opacity = '0'; // Hide using opacity
                }, 2000);

                child.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    child.style.opacity = '1'; // Show using opacity
                });
            });

            // Add the child to the container and the array of children
            container.appendChild(child);
            children.push(child);
            childCount++;
        }
    }

    // If not all children fit, display a message as an alert
    if (actualNumberOfChildren < numberOfChildren) {
        alert(`Container can fit ${actualNumberOfChildren} out of ${numberOfChildren} children.`);
    }

    // Append the container to the document body
    document.body.appendChild(container);
};

// Examples to test
//drawContainer(310, 200, 4);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);
drawContainer(200, 50, 17);
