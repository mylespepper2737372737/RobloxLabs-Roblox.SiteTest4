// LaunchApp.js
$(function () {
	if (((play_placeId = 0), Roblox.LaunchApp != undefined && !Roblox.LaunchApp.UseIOSAppStart))
		$('.AppActionDataContainer').on('click', function () {
			var t = $(this).data('startscripturl'),
				n = $(this).data('authurl');
			Roblox.Client.WaitForRoblox(function () {
				RobloxLaunch.StartApp(t, n, 'FETCH');
			});
		});
});
