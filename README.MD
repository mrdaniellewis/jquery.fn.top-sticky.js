# Position sticky polyfill

This a basic [position sticky](http://caniuse.com/#feat=css-sticky) polyfill using jQuery.

## What it does do

It supports "top" stickyness on block level elements in the same way native position sticky does.

It reads the value of "top" directly from the CSS and supports this value being modified via media queries.

It can test if the browser nativly supports position sticky.

You can specifiy which element the stickyness should be contained within.  For native position sticky it is always contained within the parent element.

## What it doesn't do

It doesn't support "bottom", "left" or "right" stickyness.

It doesn't support elements with a position other than block.

It doesn't check if an ancestor has overflow set to hidden or scroll.  In the native position sticky a scrollable ancestor will either disable the effect, or confine the effect to that scrollable area.

It doesn't use relative positioning to create the effect.  Instead is uses fixed and absolute positioning.  This produces a much smoother effect than using position relative.

It uses inline styles to position the element.  Any inline styles that are already present will be removed.

## Support

This works in IE8 plus.  It possibly also works in IE7.

On a mobile some sort of `position: fixed` support is required which might limit the effectiveness.

Note that some [mobile browsers](http://www.quirksmode.org/mobile/tableTouch.html) only run scroll events 
once after a scroll has finished.  This means the effect won't nearly be as nice.  On mobile safari you can use native, prefixed, position sticky to get round this.  If this is an issue the following untested code might work.

```js
$(document).on('touchmove', function() {
	$stickyElement.trigger('scroll');
} );
```

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

```
Add the polyfill to the element.

```js
if ( !$.fn.stickfiy.support ) {
	$('.js-sticky').stickfiy();
}
```

Remove the behavior with:

```js
$('.js-sticky').unstickfiy();
```

### Specifiying the container

For the native position sticky the element is contained within its parent (and not its offset parent like absolute positioning).

For some HTML this might be problematic.  In that case you can do the following and not use the native effect in any browser.

```js
$('.js-sticky').stickfiy($('.container'));
```

### Notes

The effect only runs if the top value is set in the CSS.

An element's position is recalculated on a scroll event on the window.

An element's size, its parent's size, its natural position and whether the element is visible 
are only recalculated on a resize event on the window or element.

If a script is manipulating the size, position or visibility of elements you may need to trigger a 
resize on the window or element to recalcuate the size and position.

In order to give the smoothest possible performance, the script transitions the element between position fixed,
position absolute and positino static.  This greatly reduces the number of repositions require.  However, this takes the element out of the document flow causing the content to jump as it adjusts.  To work round this the script will insert a hidden "ghost" element in its place with the same dimensions.

## License

Released under the MIT license.
