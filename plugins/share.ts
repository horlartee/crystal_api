export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('share', {
    mounted (el, binding) {
      el.addEventListener('click', async () => {
        const arg = binding.arg

        // do a general share
        if (!arg) {
          try {
            await navigator.share({...binding.value})
          } catch (err) {
            console.warn({ sharingError: err })
          }          
        } else {
          // if clipboard
          if (arg === 'clipboard') {
            if(navigator.clipboard) {
              try {
                await navigator.clipboard.writeText(binding.value.url)
              } catch (err) {
                console.warn({ clipboardError: err })
              }
            } else {
              const { url } = binding.value
              const input = document.createElement('input')
              document.body.appendChild(input)
              input.value = url
              input.select()
              input.setSelectionRange(0, 99999)
              document.execCommand('copy')
              document.body.removeChild(input)
            }
            // emit event
            el.dispatchEvent(new CustomEvent('copied', { detail: binding.value.title }))
            return
          }
          // do platform specific share
          let url = ''
          if(arg === 'twitter') {
            url = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(binding.value.url)
          }
          if(arg === 'facebook') {
            url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(binding.value.url)
          }
          if(arg === 'instagram') {
            url = 'https://www.instagram.com/sharer/sharer.php?u=' + encodeURIComponent(binding.value.url)
          }
          if(arg === 'whatsapp') {
            url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(binding.value.url)
          }
          if(arg === 'email') {
            url = 'mailto:?subject=' + encodeURIComponent(binding.value.subject) + '&body=' + encodeURIComponent(binding.value.body)
          }
          window.open(url, 'Share', 'width=550,height=235')
        }
      })
    }
  })
})