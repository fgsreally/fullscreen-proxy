export async function fullscreen(el: string | Element, bodyBox?: Element[], options?: FullscreenOptions) {
    let element: Element
    if (typeof el === 'string') {
        element = document.querySelector(el) as Element
    } else {
        element = el
    }
    const eleBoxMap: WeakMap<Element, Element> = new WeakMap()


    let observer = new MutationObserver((mutationRecord, mutationObserver) => {
        // 大约 2s 执行这个回调 
        mutationRecord.forEach((item) => {

            item.addedNodes.forEach((node) => {
                element.appendChild(node)
            })
        })
    });

    function closeObserver() {
        let isFullscreen = document.fullscreenElement === element;
        if (!isFullscreen) {
            observer.disconnect();
            bodyBox?.forEach((box) => {
                if (eleBoxMap.has(box)) {
                    eleBoxMap.get(box)?.appendChild(box)
                    eleBoxMap.delete(box)
                }
            });
            element.removeEventListener('fullscreenchange', closeObserver)

        }
    }
    element.addEventListener('fullscreenchange', closeObserver)

    bodyBox?.forEach((box) => {
        eleBoxMap.set(box, box.parentNode as Element)

        element.appendChild(box)

    })

    await element.requestFullscreen(options)

    // 将 observer 实例与目标 dom 进行关联
    observer.observe(document.body, { childList: true });


}