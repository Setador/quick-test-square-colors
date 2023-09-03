const drawContainer = (containerSize, childSize, numberOfChildren) => {
    const container = document.getElementById('mainSquare');
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    const maxColumns = Math.floor(containerSize / childSize);
    const maxRows = Math.floor(containerSize / childSize);
    const maxChildren = maxColumns * maxRows;
    
    const actualNumberOfChildren = Math.min(numberOfChildren, maxChildren);

    const getRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const children = [];
    let childCount = 0;

    for (let row = 0; row < maxRows; row++) {
        for (let column = 0; column < maxColumns; column++) {
            if (childCount >= actualNumberOfChildren) {
                break;
            }

            const child = document.createElement('div');
            child.style.width = `${childSize}px`;
            child.style.height = `${childSize}px`;
            child.style.position = 'absolute';
            child.style.backgroundColor = getRandomColor();
            child.style.left = `${column * childSize}px`;
            child.style.top = `${row * childSize}px`;

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

            container.appendChild(child);
            children.push(child);
            childCount++;
        }
    }

    if (actualNumberOfChildren < numberOfChildren) {
        // Display the message as an alert
        alert(`Container can fit ${actualNumberOfChildren} out of ${numberOfChildren} children.`);
    }

    document.body.appendChild(container);
};

// Examples to test
//drawContainer(310, 200, 4);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);
drawContainer(200, 50, 17);
