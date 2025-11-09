export function useXScrollTo(target: string) {
  return function (index: number) {
    //get current position of the image
    const container = document.querySelector(target) as HTMLElement
    const image = container.querySelector('ul')?.children[Math.max(index-1,0)] as HTMLElement
    //scroll to the image if image is not visible
    if (
      image.offsetLeft < container.scrollLeft ||
      image.offsetLeft + image.offsetWidth >
        container.scrollLeft + container.offsetWidth
    ) {
      //scroll image to center of container
      container.scrollTo({
        left: image.offsetLeft - container.offsetWidth / 2,
        behavior: 'smooth',
      })
    }
  }
}
