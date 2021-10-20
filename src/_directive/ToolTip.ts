const ToolTip = {
    mounted(el: HTMLInputElement): void {

        const elBox = document.getElementById("tooltip-" + el.id);

        if (elBox) {
            el.addEventListener('mouseover', () => elBox.classList.add("show"));
            el.addEventListener('mouseout', () => elBox.classList.remove("show"));
        }
    }
}

export default ToolTip;