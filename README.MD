# Position sticky polyfill

This a [position sticky](http://caniuse.com/#feat=css-sticky) polyfill using jQuery.

## What it does do

It supports "top" stickyness on block level elements in the same way native position sticky does.

It reads the value of "top" directly from the CSS and supports this value being modified via media queries.

It can test if the browser natively supports position sticky.

You can specify which element the stickyness should be contained within.  For native position sticky it is always contained within the parent element.

## What it doesn't do

It doesn't support "bottom", "left" or "right" stickyness.

It doesn't support elements with a position other than block.

It doesn't check if an ancestor has overflow set to hidden or scroll.  In the native position sticky, if there is a scrollable ancestor this will either disable the effect, or confine the effect to that scrollable area.

It doesn't use relative positioning to create the effect.  Instead is uses fixed and absolute positioning.  This produces a much smoother effect than using position relative.

It uses inline styles to position the element.  Any inline styles that are already present will be removed.

## Support

This works in IE8 plus.  It possibly also works in IE7.

On a mobile some sort of `position: fixed` support is required which might limit the effectiveness.  It is probably best to turn the effect off on mobiles using media queries.

If available, particularly on iOS, always use the native sticky positioning as it works a lot better.

On iOS7 and some other browsers the repositioning can only happen at the end of a scroll event, which kind of ruins the effect.  See [mobile support for the scroll event](http://www.quirksmode.org/mobile/tableTouch.html)

## Usage

Create an element to be sticky
```html
<div class="js-sticky sticky">
	Foo bar
</div>
```

Add some CSS for native support and to set the value of top

```css
.sticky {
	top: 1em; 
	position: -webkit-sticky; 
	position: sticky;
}

/* Disable the effect at a suitable breakpoint if desired */
@media (max-width: 500px) {
	.sticky {top: auto;}
}

```
Add the polyfill to the element.

```js
if ( !$.fn.stickfiy.support ) {
	$('.js-sticky').stickfiy();
}
```

Remove the behaviour with:

```js
$('.js-sticky').unstickfiy();
```

### Specifying the container

For the native position sticky the element is contained within its parent (and not its offset parent like absolute positioning).

For some HTML this might be problematic.  In that case you can do the following and not use the native effect in any browser.

```js
$('.js-sticky').stickfiy($('.container'));
```

Note that this works terribly on an iphone and only tolerably on an ipad due to issues with how iOS handles fixed positioning.

### Notes

The effect only runs if the top value is set in the CSS.

An element's position is recalculated on a scroll event on the window.

An element's size, its parent's size, its natural position and whether the element is visible 
are only recalculated on a resize event on the window or element.

If a script is manipulating the size, position or visibility of elements you may can trigger a 
`resize` event on the window or element to recalculate the size and position.

In order to give the smoothest possible performance, the script transitions the element between position fixed, position absolute and position static.  This greatly reduces the number of repositions require.  However, this takes the element out of the document flow causing the content to jump as it adjusts.  To work round this the script will insert a hidden "ghost" element in its place with the same dimensions.

## License

Released under the ISC license.
