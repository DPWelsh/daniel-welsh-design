/* The hero animation, lifted verbatim from the hand-built index.html.
 *
 * Deliberately still DOM-query driven rather than rewritten into React
 * state: it drives 240 frame swaps a second across four sequences, and
 * re-rendering that through React would be slower and less faithful. The
 * component renders the markup, this drives it, and the returned function
 * tears it all down when the route unmounts.
 *
 * Only change from the original: /site-assets is absolute, because a
 * relative path breaks on any route deeper than /.
 */
export function initHero(): () => void {
  const listeners: Array<[EventTarget, string, EventListener]> = [];
  const rafs: number[] = [];
  const on = (
    t: EventTarget,
    ev: string,
    fn: EventListener,
    opts?: AddEventListenerOptions,
  ) => {
    t.addEventListener(ev, fn, opts);
    listeners.push([t, ev, fn]);
  };

  const billieSequenceMarkup = Array.from({ length: 60 }, (_: unknown, index: number) => {
          const number = String(index).padStart(3, '0');
          const active = index === 0 ? ' is-active' : '';
          return `<img class="billie-frame${active}" data-frame="${index}" src="/site-assets/billie-ascii-walk/frame-${number}.svg?v=1" alt="" aria-hidden="true" loading="eager" decoding="async" draggable="false">`;
        }).join('');
        document.querySelector<HTMLElement>('.billie-base-sequence')!.innerHTML = billieSequenceMarkup;
        document.querySelector<HTMLElement>('.billie-red-sequence')!.innerHTML = billieSequenceMarkup;

        const hero = document.querySelector<HTMLElement>('.hero')!;
        const walkerArt = document.querySelector<HTMLElement>('.walker-art')!;
        const laptopArt = document.querySelector<HTMLElement>('.laptop-art')!;
        const billieArt = document.querySelector<HTMLElement>('.billie-art')!;
        const frames = [...document.querySelectorAll<HTMLImageElement>('.walker-base-sequence .walk-frame')];
        const redFrames = [...document.querySelectorAll<HTMLImageElement>('.walker-red-sequence .walk-frame')];
        const laptopFrames = [...document.querySelectorAll<HTMLImageElement>('.laptop-base-sequence .laptop-frame')];
        const redLaptopFrames = [...document.querySelectorAll<HTMLImageElement>('.laptop-red-sequence .laptop-frame')];
        const billieFrames = [...document.querySelectorAll<HTMLImageElement>('.billie-base-sequence .billie-frame')];
        const redBillieFrames = [...document.querySelectorAll<HTMLImageElement>('.billie-red-sequence .billie-frame')];
        const toggle = document.getElementById('motion-toggle') as HTMLButtonElement;
        const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement;
        const siteMenu = document.getElementById('site-menu') as HTMLDialogElement;
        const menuClose = document.getElementById('menu-close') as HTMLButtonElement;
        const typedWord = document.getElementById('typed-word') as HTMLElement;
        const typePhrases = ['apps.', 'automations.', 'systems.', 'workflows.', 'things.'];
        const frameDuration = 83.33333333333333;
        const walkerLoopDuration = frameDuration * frames.length;
        const laptopLoopDuration = 7500;
        const typePhraseDuration = 2500;
        const typeLoopDuration = typePhraseDuration * typePhrases.length;
        const typeHoldUntil = 1800;
        const typeCharacterDuration = 85;
        const typeEraseDuration = 55;
        const timelineDuration = 15000;
        const laptopFrameDuration = laptopLoopDuration / laptopFrames.length;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
        let walkerCurrent = 0;
        let laptopCurrent = 0;
        let elapsed = 0;
        let startedAt = 0;
        let raf = 0;
        let running = !reduced;
        let revealRaf = 0;
        let pointerX = -999;
        let pointerY = -999;

        function showWalker(index: number) {
          if (index === walkerCurrent && frames[index]?.classList.contains('is-active')) return;
          frames[walkerCurrent]?.classList.remove('is-active');
          redFrames[walkerCurrent]?.classList.remove('is-active');
          billieFrames[walkerCurrent]?.classList.remove('is-active');
          redBillieFrames[walkerCurrent]?.classList.remove('is-active');
          walkerCurrent = index;
          frames[walkerCurrent].classList.add('is-active');
          redFrames[walkerCurrent].classList.add('is-active');
          billieFrames[walkerCurrent].classList.add('is-active');
          redBillieFrames[walkerCurrent].classList.add('is-active');
        }

        function showLaptop(index: number) {
          if (index === laptopCurrent && laptopFrames[index]?.classList.contains('is-active')) return;
          laptopFrames[laptopCurrent]?.classList.remove('is-active');
          redLaptopFrames[laptopCurrent]?.classList.remove('is-active');
          laptopCurrent = index;
          laptopFrames[laptopCurrent].classList.add('is-active');
          redLaptopFrames[laptopCurrent].classList.add('is-active');
        }

        function updateTypewriter(time: number) {
          if (reduced) return;
          const loopTime = time % typeLoopDuration;
          const phraseIndex = Math.floor(loopTime / typePhraseDuration);
          const phrase = typePhrases[phraseIndex];
          const phraseTime = loopTime % typePhraseDuration;
          let visibleCharacters;

          if (phraseTime < typeHoldUntil) {
            visibleCharacters = Math.min(
              phrase.length,
              Math.floor(phraseTime / typeCharacterDuration) + 1,
            );
          } else {
            visibleCharacters = Math.max(
              0,
              phrase.length - Math.floor((phraseTime - typeHoldUntil) / typeEraseDuration) - 1,
            );
          }

          typedWord.textContent = phrase.slice(0, visibleCharacters);
        }

        function tick(now: number) {
          elapsed = Math.max(0, now - startedAt) % timelineDuration;
          showWalker(Math.floor((elapsed % walkerLoopDuration) / frameDuration) % frames.length);
          showLaptop(Math.floor((elapsed % laptopLoopDuration) / laptopFrameDuration) % laptopFrames.length);
          updateTypewriter(elapsed);
          raf = requestAnimationFrame(tick); rafs.push(raf);
        }

        function updateReveal() {
          for (const art of [walkerArt, laptopArt, billieArt]) {
            const rect = art.getBoundingClientRect();
            art.style.setProperty('--reveal-x', (pointerX - rect.left) + 'px');
            art.style.setProperty('--reveal-y', (pointerY - rect.top) + 'px');
          }
          revealRaf = 0;
        }

        function hideReveal() {
          pointerX = -999;
          pointerY = -999;
          updateReveal();
        }

        if (finePointer) {
          on(hero, 'pointermove', ((event: PointerEvent) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (!revealRaf) revealRaf = requestAnimationFrame(updateReveal);
          }) as EventListener, { passive: true });
          on(hero, 'pointerleave', hideReveal);
          on(hero, 'pointercancel', hideReveal);
          on(window, 'blur', hideReveal);
        }

        function play() {
          running = true;
          hero.classList.remove('is-paused');
          startedAt = performance.now() - elapsed;
          toggle.textContent = 'Pause motion';
          toggle.setAttribute('aria-pressed', 'true');
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick); rafs.push(raf);
        }

        function pause() {
          if (running) elapsed = Math.max(0, performance.now() - startedAt) % timelineDuration;
          running = false;
          hero.classList.add('is-paused');
          cancelAnimationFrame(raf);
          toggle.textContent = 'Play motion';
          toggle.setAttribute('aria-pressed', 'false');
        }

        function openMenu() {
          siteMenu.showModal();
          menuToggle.setAttribute('aria-expanded', 'true');
          document.body.classList.add('menu-open');
          menuClose.focus();
        }

        function closeMenu() {
          if (siteMenu.open) siteMenu.close();
        }

        on(menuToggle, 'click', openMenu);
        on(menuClose, 'click', closeMenu);
        on(siteMenu, 'click', ((event: MouseEvent) => {
          const rect = siteMenu.getBoundingClientRect();
          const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

          if (event.target === siteMenu && outside) closeMenu();
        }) as EventListener);
        on(siteMenu, 'close', () => {
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
          menuToggle.focus();
        });

        on(toggle, 'click', () => running ? pause() : play());
        on(document, 'visibilitychange', () => {
          if (document.hidden) cancelAnimationFrame(raf);
          else if (running) {
            startedAt = performance.now() - elapsed;
            raf = requestAnimationFrame(tick); rafs.push(raf);
          }
        });

        if (!reduced) updateTypewriter(0);

        Promise.allSettled([...frames, ...redFrames, ...laptopFrames, ...redLaptopFrames, ...billieFrames, ...redBillieFrames].map((frame) => frame.decode())).then(() => {
          if (running) play();
          else pause();
        });

  return () => {
    for (const [t, ev, fn] of listeners) t.removeEventListener(ev, fn);
    for (const id of rafs) cancelAnimationFrame(id);
    if (typeof raf === "number") cancelAnimationFrame(raf);
    if (typeof revealRaf === "number") cancelAnimationFrame(revealRaf);
  };
}
