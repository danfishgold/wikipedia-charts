<template>
  <main>
    <h1>Talk:Wikipedia Charts</h1>
    <p class="subtitle">Not from Wikipedia, the free encyclopedia</p>
    <vue-markdown :source="source" :breaks="false"></vue-markdown>
  </main>
</template>

<script>
import VueMarkdown from 'vue-markdown'

const source = `
This page covers implementation details for this site. Links in this page will
not point to Wikipedia articles, but rather to the actual sites of the things
the links are about. Like a normal website that isn't mascarading as [Wikipedia]
would do.

## The Wikimedia API

This website uses [Wikimedia's API][wikimedia-api], which is fast and free and
is about Wikipedia (and other Wikimedia stuff) so there's a lot of cool data to
work with! For this website I specifically used the ["Most viewed
articles"][most-viewed] endpoint of the [Pageview API][pageview-api], which is
pretty self explanatory. Information about a given day is only available after
it's over, which is a little dissapointing because it could have been really
cool to see trends in real time.

## Platform and Technologies

I made this site using [Vue.js], [TypeScript], and [Sass]. It's built using
[Parcel] and deployed on [Netlify].

### Sass, Parcel, and Netlify

I'm grouping these three together because I basically only have good things to
say about them: [Sass] is wonderful and provides great improvements over plain
CSS that make the code a lot cleaner. [Netlify] is also delightful to use. I
just needed to add a \`netlify.toml\` file with three lines of configuration and
the site was ready to deploy. And [Parcel] makes setting up front end projects
so much nicer! I don't have to dig around [Webpack]'s and [Babel]'s
documentation just to make a simple tiny standard site. I think Parcel has the
opposite problem to Webpack: Webpack makes it very complicated to create simple
setups, and Parcel _really_ likes to hide customization options. Luckily this is
not something I had trouble with. This time.

### Vue.js, TypeScript, and Parcel

For some reason I didn't make this site in [Elm]. That reason is that I wanted
to play around with Vue. This is my third project using Vue and I still like it
a lot! I have no idea how it's like in a big project with a bunch of shared
code, but it was a great experience for this ~small site. The only thing I had
trouble with is using TypeScript in Vue. This paragraph is going to age well
considering Vue 3.0 is right around the corner and one of its features is better
TypeScript support but why not: it wasn't immediately obvious how to use
TypeScript in Vue but after some diggin around I found out about
[\`vue-property-decorator\`][vue-property-decorator], which adds a bunch of
convenience decorators that help TypeScript's type inference. Without it I would
have had to write some very ugly code to get type inference. All in all it was
okay, but there was a lot of friction. Hopefully Vue 3 will change that.

### Not Glitch

[Glitch] is a wonderful and free platform for making websites! It would have
been a much better fit for the secondary goal of this project (which is to be
easily forkable/remixable), but I really don't like the loading screen that
would have to appear before the site becomes visible (free apps on Glitch "go to
sleep" and when someone visits them after a period of inactivity it has to
rebuild. There is a paid program where this is not the case). Recently Glitch
announced that static sites would not need this loading screen, but even though
this site _is_ static, Glitch would not see it that way because it has a build
process. Compared to Glitch, Netlify's free plan is very generous, has much
better support for custom domains, and has a very simple deployment process.

## Design

### Inspiration? Is it fair to call it that?

I mean, it's pretty obvious where I got the idea for the design of this website.
But anyway, it was fun to replicate someone else's design because it provides an
interesting perspective, especially when it comes to a site I have seen so many
times. In the middle of the process of making it look like Wikipedia I got to
the uncanny valley where it almost looked like Wikipedia but something was off
and it was fun to get to the point where it was hard for me to find my website
among all of my open Wikipedia tabs.

The final design is not an exact replica, most notably in that this site doesn't
have a sidebar. This is because I didn't have enough links to put there and it
would have looked weird otherwise. Also, I completely ignored Wikipedia's mobile
design, mainly because it had even more elements that I had no way of
replicating or replacing, and I wanted to avoid answering hard design choices.
The end result is a stripped down desktop Wikipedia, which theoretically looks
good on all devices.

It was fun to dig around Wikipedia's HTML and notice little things that I hadn't
before, like the abundance of gradients in Wikipedia's navigation bar, and also
the fact that articles in Wikipedia, which are made specifically for long form
reading, don't have a maximum width?! Dear reader, I did not repeat this weird
choice and settled for an equally weird choice of a maximum width of 960 pixels.
I also used a font size of 16px rather than 14px because I have human eyes.

### The little date picker thing

Man was it hard to come with a design for it that didn't look foreign in a page
meant to look like Wikipedia. I tried to find some reference material for
interactive elements on Wikipedia, which is hard because it's Wikipedia. The
closest thing I had in mind were the little arrows to the previous/next episodes
in Wikipedia articles for episodes of TV shows. Here's [an
example][steven-universe-episode] (spoilers for Steven Universe S01E20).

I made it stick to the bottom of the screen because I think that would be more
comfortable for mobile users. However, I am afraid that people wouldn't notice
it's there. This fear is warrented because after I made it stick to the bottom
of the window I kept scrolling all the way to the end of the table before
realizing what I was doing.

[wikipedia]: https://en.wikipedia.org/wiki/Wikipedia
[wikimedia-api]: https://www.mediawiki.org/wiki/API:Main_page
[most-viewed]:
  https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews#Most_viewed_articles
[pageview-api]: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews
[parcel]: https://parceljs.org
[typescript]: https://www.typescriptlang.org
[sass]: https://sass-lang.com
[vue.js]: https://vuejs.org
[glitch]: https://glitch.com
[elm]: https://elm-lang.org
[netlify]: https://netlify.com
[webpack]: https://webpack.js.org
[babel]: https://babeljs.io
[vue-property-decorator]: https://github.com/kaorun343/vue-property-decorator
[steven-universe-episode]: https://en.wikipedia.org/wiki/Coach_Steven
`

export default {
  data() {
    return { source }
  },
  components: { VueMarkdown },
}
</script>
