local TopoRuntime = require(script.Parent.Parent.TopoRuntime)

--[=[
<<<<<<< HEAD
=======
	@function useDeltaTime
>>>>>>> 16b6883d1f5d8d0723e35421540e548334398101
	@within Matter

	:::info Topologically-aware function
	This function is only usable if called within the context of [`Loop:begin`](/api/Loop#begin).
	:::

	Returns the `os.clock()` time delta between the start of this and last frame.
]=]
<<<<<<< HEAD
local function useDeltaTime(): number
=======
local function useDeltaTime()
>>>>>>> 16b6883d1f5d8d0723e35421540e548334398101
	local state = TopoRuntime.useFrameState()

	return state.deltaTime
end

return useDeltaTime
