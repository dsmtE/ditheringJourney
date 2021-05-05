<script lang="ts">

    export let width : number = 256;
    export let height : number = 256;
	import { onMount } from 'svelte';
    import { isLittleEndian } from '$lib/core/utils';
	
	// source https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
	onMount(() => {
		const canvas = <HTMLCanvasElement> document.getElementById('canvas');
		const ctx = canvas.getContext('2d');

		const imageData: ImageData = ctx.getImageData(0, 0, width, height);
		
		const buf = new ArrayBuffer(imageData.data.length);
		const buf8 = new Uint8ClampedArray(buf);
		const data = new Uint32Array(buf);
		
        const isle = isLittleEndian();

		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				
				const value : number = x * y & 0xff; // moire pattern
				
				// let index = (y * width + x) * 4
				// buf8[index]   = value	// red
				// buf8[++index] = value	// green
				// buf8[++index] = value	// blue
				// buf8[++index] = 255	// alpha

				if( isle) { // abgr
					data[y * width + x] =
						(255   << 24) |    // alpha
						(value << 16) |    // blue
						(value <<  8) |    // green
						value;            // red
				}else { // rgba
					data[y * width + x] =
						(value << 24) |    // red
						(value << 16) |    // green
						(value <<  8) |    // blue
						255;              // alpha
				}
			}
		}

		imageData.data.set(buf8);

		// For the altered image data to appear in the canvas, we must put the image data at the origin (0,0).
		ctx.putImageData(imageData, 0, 0);
		// Note that because data is a reference to imageData.data, we don't need to explicitly reassign it.
	})

</script>

<canvas id="canvas" width={width} height={height}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>