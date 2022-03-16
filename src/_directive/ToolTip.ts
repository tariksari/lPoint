const ToolTip = {
    mounted(el: HTMLInputElement): void {

        const elBox = document.getElementById("tooltip-" + el.id);

        if (elBox) {
            el.addEventListener("mouseover", () => {
                if (elBox.innerHTML.length > 0) {
                  elBox.classList.add("show");
                }
              });
            el.addEventListener('mouseout', () => elBox.classList.remove("show"));
        }
    }
}

export default ToolTip;