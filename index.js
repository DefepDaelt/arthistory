document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header')
  const menu = document.querySelector('#header nav')
  const headerHeight = header.offsetHeight
  const menuButtons = document.querySelectorAll('nav .toggle')
  const backToTopButton = document.querySelector('.back-to-top')
  const fragmentLinks = document.querySelectorAll('a[href^="#"]')

  const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 850,
    reset: true
  })

  scrollReveal.reveal(
    `
  #home .text,
  #prehistory .container,
  #mesopotamia .container,
  #egyptian .container,
  #greek .container,
  #romana .container,
  #comeSoon .container,
  footer .brand
`,
    { interval: 100 }
  )

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 560) {
      backToTopButton.classList.add('show')
    } else {
      backToTopButton.classList.remove('show')
    }

    if (window.scrollY >= headerHeight) {
      header.classList.add('scroll')
    } else {
      header.classList.remove('scroll')
    }
  })

  const homeButton = document.querySelector('.button')

  homeButton.addEventListener('click', () => {
    menu.classList.toggle('show')
  })

  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      menu.classList.toggle('show')
    })
  })

  function getDistanceFromTheTop(element) {
    const elementID = element.getAttribute('href')
    return document.querySelector(elementID).offsetTop
  }

  function scrollToSection(event) {
    event.preventDefault()

    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 70
    try {
      smoothScrollTo(0, distanceFromTheTop, 800)
    } catch (error) {
      console.error(error)
    }
  }

  fragmentLinks.forEach(link => {
    link.addEventListener('click', event => {
      menu.classList.remove('show')
      scrollToSection(event)
    })
  })

  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset
    const startY = window.scrollY || window.pageYOffset
    const distanceX = endX - startX
    const distanceY = endY - startY
    const startTime = new Date().getTime()

    duration = typeof duration !== 'undefined' ? duration : 400

    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
    }

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime
      const newX = easeInOutQuart(time, startX, distanceX, duration)
      const newY = easeInOutQuart(time, startY, distanceY, duration)
      if (time >= duration) {
        clearTimeout(timer)
      }
      window.scroll(newX, newY)
    }, 1000 / 60)
  }
})
