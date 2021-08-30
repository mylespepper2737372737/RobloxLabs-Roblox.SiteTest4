// party.js
var Party = {};
(Party.ToggleTab = function (n) {
	n == null ? $('#party-container').toggle() : $('#party-container').toggle(n);
}),
	(Party.SetActiveView = function (n) {
		$('.party-window').hide(), $('#' + n).show(), (Party.ActiveView = n);
	}),
	(Party.CreateNew = function () {
		Party.ActiveView != 'party_my' && (Party.SetActiveView('party_my'), $('#chat_messages').html('')),
			$.getJSON('/chat/party.ashx', { reqtype: 'create' }, function (n) {
				return Party.HandleError(n)
					? !1
					: (Party.ProcessPolledData(n),
					  (Party.FirstLoad = !0),
					  Party.Refresh(),
					  Party.PollForUpdates(),
					  Party.ToggleTab(!0),
					  !0);
			});
	}),
	(Party.DoInvite = function (n) {
		(elem = $('#' + n)), Party.InviteUser(elem.val()), elem.val('');
	}),
	(Party.GenerateReportUserURLHTML = function (n) {
		var i = $('<span>'),
			t;
		return (
			i.attr('class', 'report-link'),
			i.attr('data-user-name', n.UserName),
			i.attr('data-user-id', n.UserID),
			i.text(Party.Resources.report),
			(t = $('<span>')),
			t.append('('),
			t.append(i),
			t.append(')'),
			$('<div>').append(t).html()
		);
	}),
	(Party.GenerateKickUserHTML = function (n) {
		var t = $('<div>');
		return (
			t.attr('id', 'party_kick_' + n),
			t.attr('class', 'kick-user'),
			t.attr('title', 'Kick from party'),
			t.attr('data-user-id', n),
			$('<div>').append(t).html()
		);
	}),
	(Party.GetMemberListAsHtml = function () {
		for (
			var r = '', f = $('#partyMemberTemplate').html(), u = Party.AmILeader(), n, i, t = 0;
			t < Party.ActiveParty.Members.length;
			t++
		)
			(n = f.replace(/UID/g, Party.ActiveParty.Members[t].UserID)),
				(Party.ActiveParty.Members[t].IsOnline == !0 || Party.ActiveParty.Members[t].IsOnline == 'True') &&
					(n = n.replace('friend_dock_offlinestatus', 'friend_dock_onlinestatus')),
				(n = n.replace(
					'[PARTY_MEMBER_THUMBNAIL]',
					"<img src='" + Party.ActiveParty.Members[t].Thumbnail + "' style='width:24px;height:24px'/>",
				)),
				(n =
					t == 0
						? n.replace('[PARTY_MEMBER_NAME]', '<strong>' + Party.ActiveParty.Members[t].UserName + '</strong>')
						: n.replace('[PARTY_MEMBER_NAME]', Party.ActiveParty.Members[t].UserName)),
				(n =
					u && Party.ActiveParty.Members[t].UserID != Party.CurrentUserID
						? n.replace('[PARTY_KICK_MEMBER]', Party.GenerateKickUserHTML(Party.ActiveParty.Members[t].UserID))
						: n.replace('[PARTY_KICK_MEMBER]', '')),
				Party.ActiveParty.Members[t].Pending == !1
					? ((i = ''),
					  Party.ActiveParty.Members[t].UserID != Party.CurrentUserID &&
							(i = Party.GenerateReportUserURLHTML(Party.ActiveParty.Members[t])),
					  (n = n.replace('[PARTY_MEMBER_REPORT]', i)))
					: (n = n.replace('[PARTY_MEMBER_REPORT]', "<span style='color: grey'>" + Party.Resources.pending + '</span>')),
				(r += n + '');
		return r;
	}),
	(Party.ProcessKey = function (n, t) {
		return (t == null && (t = window.event), t.keyCode == 13) ? (Party.DoInvite(n), !1) : !0;
	}),
	(Party.Refresh = function () {
		var n, i, f, r, t, u;
		if (Party.ActiveParty.PartyGuid)
			if (Party.ActiveParty.Members.length > 1) {
				for (n = 0; n < Party.ActiveParty.Members.length; n++)
					if (Party.ActiveParty.Members[n].UserID == Party.CurrentUserID) {
						if (Party.ActiveParty.Members[n].Pending == !0 && Party.ActiveView != 'party_pending')
							Party.Cache.Updated && $('#party_invite_list').html(Party.GetMemberListAsHtml()),
								Party.SetActiveView('party_pending'),
								$('#invite-header').html($('#invite-header').html().replace('RobloTim', Party.ActiveParty.CreatorName)),
								Party.ToggleTab(!0),
								(i = document.title),
								(document.title = Party.Resources.partyInvite),
								(document.getElementById('party_pending_title').className = 'title title-flash'),
								setTimeout(
									'document.title = "' + i + "\"; document.getElementById('party_pending_title').className = 'title';",
									500,
								),
								setTimeout(
									'document.title = "' +
										Party.Resources.partyInvite +
										"\"; document.getElementById('party_pending_title').className = 'title title-flash';",
									1e3,
								),
								setTimeout(
									'document.title = "' + i + "\"; document.getElementById('party_pending_title').className = 'title';",
									1500,
								),
								setTimeout(
									'document.title = "' +
										Party.Resources.partyInvite +
										"\"; document.getElementById('party_pending_title').className = 'title title-flash';",
									2e3,
								),
								setTimeout(
									'document.title = "' + i + "\"; document.getElementById('party_pending_title').className = 'title';",
									2500,
								),
								setTimeout(
									'document.title = "' +
										Party.Resources.partyInvite +
										"\"; document.getElementById('party_pending_title').className = 'title title-flash';",
									3e3,
								),
								setTimeout(
									'document.title = "' + i + "\"; document.getElementById('party_pending_title').className = 'title';",
									3500,
								);
						else if (Party.ActiveParty.Members[n].Pending == !1) {
							if (
								(Party.Cache.Updated && $('#party_member_list').html(Party.GetMemberListAsHtml()),
								Party.ActiveView != 'party_my' && (Party.SetActiveView('party_my'), $('#chat_messages').html('')),
								Party.ActiveParty.Members[n].HasUpdates || Party.FirstLoad == !0)
							) {
								for (Party.FirstLoad = !1, f = '', r = Party.ActiveParty.Conversation, t = 0; t < r.length; t++)
									f +=
										"<div class='party-chat-message'><span class='chat-sender-self'>" +
										r[t].SenderUserName +
										'</span>: ' +
										r[t].Message +
										'</div>';
								(u = $('#chat_messages')),
									$(u).html(''),
									$(u).append(f),
									typeof ChatBar.PlaySound == 'function' && ChatBar.PlaySound('msgrec'),
									window.setTimeout(function () {
										$('#chat_messages').prop({ scrollTop: $('#chat_messages').prop('scrollHeight') });
									}, 300);
							}
							Party.CurrentUserID != Party.ActiveParty.CreatorID && $('#party_invite_instructions').hide(),
								Party.PlayEnabled && Party.CurrentUserID != Party.ActiveParty.CreatorID
									? $('#party-auto-follow-setting').show()
									: $('#party-auto-follow-setting').hide(),
								Party.PlayEnabled != !0
									? ($('#party_game_thumb').html(''), $('#party_game_name').html(''), $('#party_game_follow_me').hide())
									: Party.ActiveParty.PartyGameAsset != null
									? (Party.ActiveParty.PartyGameThumbnail == null || Party.ActiveParty.PartyGameThumbnail.IsFinal == !1
											? $('#party_game_thumb').html(
													"<a href='/Item.aspx?id=" +
														Party.ActiveParty.PartyGameAsset.ID +
														"'><img src='/images/empty.png' width='75' height='75' alt='" +
														Party.ActiveParty.PartyGameAsset.Name.escapeHTML() +
														"' /></a>",
											  )
											: $('#party_game_thumb').html(
													"<a href='/Item.aspx?id=" +
														Party.ActiveParty.PartyGameAsset.ID +
														"'><img src='" +
														Party.ActiveParty.PartyGameThumbnail.Url +
														"' alt='" +
														Party.ActiveParty.PartyGameAsset.Name.escapeHTML() +
														"' /></a>",
											  ),
									  $('#party_game_name').html(Party.ActiveParty.PartyGameAsset.Name),
									  $('#party_game_follow_me').show(),
									  Party.ToggleTab(!0),
									  Party.ActiveParty.PartyLeaderIsInGame == !1 || Party.ActiveParty.PartyLeaderIsInGame == 'False'
											? $('#party_game_follow_me').addClass('btn-disabled-primary')
											: $('#party_game_follow_me').removeClass('btn-disabled-primary'))
									: ($('#party_game_thumb').html(''), $('#party_game_name').html(''), $('#party_game_follow_me').hide());
						}
						break;
					}
			} else Party.SetActiveView('party_none'), Party.RemoveUser(Party.CurrentUserID);
		else Party.SetActiveView('party_none');
	}),
	(Party.PollForUpdates = function () {
		Party.PollThreadAvailable &&
			Party.ActiveParty.PartyGuid &&
			((Party.PollThreadAvailable = !1),
			$.getJSON('/chat/party.ashx', { reqtype: 'get' }, function (n) {
				Party.ProcessPolledData(n), (Party.PollThreadAvailable = !0), Party.Refresh();
			}));
	}),
	(Party.SendMessage = function (n) {
		if (n != '') {
			var t = n.escapeHTML();
			$('#chat_messages').append("<span class='chat-sender-self'>" + Party.CurrentUserName + '</span>: ' + t + '<br /><br />'),
				$('#chat_messages').prop({ scrollTop: $('#chat_messages').prop('scrollHeight') }),
				$('#comments').val(''),
				$.ajax({
					url: '/chat/send.ashx?partyGuid=' + Party.ActiveParty.PartyGuid,
					type: 'POST',
					data: 'message=' + encodeURIComponent(n),
					success: Party.HandleError,
				});
		}
	}),
	(Party.RemoveUser = function (n) {
		$('#party_kick_' + n).html("<img src='/images/spinners/waiting.gif' />"),
			$.getJSON('/chat/party.ashx', { reqtype: 'removeUser', userid: n }, function (t) {
				Party.HandleError(t) || ($('#party_kick_' + n).remove(), $('#party_pendinguserid_' + n).remove(), Party.PollForUpdates());
			});
	}),
	(Party.InviteUser = function (n) {
		(n = n.trim()),
			n == null || n == ''
				? alert(Party.Resources.inviteInstructions)
				: Party.ActiveParty == null || typeof Party.ActiveParty.Members == 'undefined'
				? (Party.SetActiveView('party_loading'),
				  $.getJSON('/chat/party.ashx', { reqtype: 'createAndInvite', userName: n }, function (n) {
						if (Party.HandleError(n)) return Party.PollForUpdates(), Party.SetActiveView('party_none'), !0;
						Party.ProcessPolledData(n),
							Party.SetActiveView('party_my'),
							(Party.FirstLoad = !0),
							Party.Refresh(),
							Party.PollForUpdates(),
							Party.ToggleTab(!0);
				  }))
				: (typeof Party.ActiveParty.Error == 'undefined' || Party.ActiveParty.Error == '') &&
				  (Party.ActiveParty.Members.length >= Party.MaxPartySize
						? alert(Party.Resources.partyFull)
						: $.getJSON('/chat/party.ashx', { reqtype: 'inviteUser', userName: n }, function (n) {
								Party.HandleError(n), Party.PollForUpdates();
						  }));
	}),
	(Party.AcceptInvite = function () {
		$.getJSON('/chat/party.ashx', { reqtype: 'acceptInvite' }, function (n) {
			Party.HandleError(n), (Party.FirstLoad = !0), Party.ProcessPolledData(n), Party.Refresh();
		});
	}),
	(Party.DeclineInvite = function () {
		Party.SetActiveView('party_none'),
			$.getJSON('/chat/party.ashx', { reqtype: 'removeUser', userID: Party.CurrentUserID }, function (n) {
				Party.HandleError(n), Party.ProcessPolledData(n), Party.Refresh();
			});
	}),
	(Party.HandleError = function (n) {
		return n.Error ? (alert(n.Error), !0) : !1;
	}),
	(Party.AmILeader = function () {
		return Party.ActiveParty && Party.CurrentUserID == Party.ActiveParty.CreatorID;
	}),
	(Party.ProcessPolledData = function (n) {
		var i, r, t, u;
		if (n != null) {
			if (((Party.ActiveParty = n), Party.ActiveParty.Members))
				for (i = 0; i < Party.ActiveParty.Members.length; i++)
					Party.ActiveParty.Members[i].UserID == Party.CurrentUserID && (r = Party.ActiveParty.Members[i]);
			Party.AmILeader() || Party.ActiveParty.PartyGuid == null || Party.ActiveParty.PartyGameAsset == null || r == null || r.Pending
				? (typeof Party.ActiveParty.Members == 'undefined' || Party.ActiveParty.Members.length <= 1) &&
				  Party.SetActiveView('party_none')
				: ((t = JSON.parse(sessionStorage.getItem('PartyStorage') || '{}')),
				  (t.AcknowledgedGameGuid && t.AcknowledgedGameGuid == Party.ActiveParty.GameGuid) ||
						((u = Party.ActiveParty.PartyGameAsset.Name),
						(r.AutoFollowPartyLeader ||
							confirm(
								Party.Resources.joinConfirm1 + u + Party.Resources.joinConfirm2 + '\n\n' + Party.Resources.joinConfirm3,
							)) &&
							Party.JoinGameWithParty(),
						(t.AcknowledgedGameGuid = Party.ActiveParty.GameGuid),
						sessionStorage.setItem('PartyStorage', JSON.stringify(t)))),
				Party.UpdateCache();
		}
	}),
	(Party.JoinGameWithParty = function () {
		var n = Party.ActiveParty.PartyGameAsset.ID,
			i,
			t;
		(play_placeId = n),
			(i = Party.ActiveParty.PartyGuid),
			(t = Party.ActiveParty.GameGuid),
			(RobloxLaunch._GoogleAnalyticsCallback = function () {
				GoogleAnalyticsEvents.FireEvent('Play', 'User'), RobloxEventManager.triggerEvent('rbx_evt_play_user', { placeId: n });
			}),
			Roblox.Client.WaitForRoblox(function () {
				RobloxLaunch.RequestPlayWithParty('PlaceLauncherStatusPanel', n, i, t);
			});
	}),
	(Party.OnPageLoad = function () {
		$('.closeparty').click(function () {
			Party.ToggleTab(null);
		});
		$(document).on('keydown', '#comments', function (n) {
			return n.keyCode == 13 ? (Party.SendMessage($('#comments').val()), !1) : !0;
		});
		$('#party_my .main').css('max-height', $(window).height() - 150),
			$('.party-invite-box').val(Party.Resources.enterUserName),
			$('.party-invite-box').focus(function () {
				this.value == Party.Resources.enterUserName ? (this.value = '') : this.select();
			}),
			$('.party-invite-box').blur(function () {
				$.trim(this.value) == '' && (this.value = Party.Resources.enterUserName);
			});
		$('.party-window').on('click', '.report-link', function () {
			return confirm(Party.Resources.areYouSureReport + $(this).data('user-name') + '?')
				? ((window.location = '/abusereport/partychat?partyguid=' + Party.ActiveParty.PartyGuid + '&id=' + $(this).data('user-id')),
				  !0)
				: !1;
		});
		$('.party-window').on('click', '.kick-user', function () {
			return Party.RemoveUser($(this).data('user-id')), !1;
		});
		Party.Refresh(),
			(Party.PollIntervalTimer = setInterval(function () {
				Party.PollForUpdates();
			}, 3e3));
	}),
	(Party.Cache = {}),
	(Party.Cache.Members = []),
	(Party.Cache.Updated = !1),
	(Party.UpdateCache = function () {
		var n, t;
		if (typeof Party.ActiveParty.Members == 'undefined' || Party.Cache.Members.length != Party.ActiveParty.Members.length)
			return (Party.Cache.Members = Party.ActiveParty.Members || []), (Party.Cache.Updated = !0), !0;
		for (Party.Cache.Updated = !1, n = 0; n < Party.ActiveParty.Members.length; n++)
			for (t in Party.ActiveParty.Members[n])
				if (Party.ActiveParty.Members[n].hasOwnProperty(t) && Party.Cache.Members[n][t] != Party.ActiveParty.Members[n][t])
					return (Party.Cache.Members = Party.ActiveParty.Members), (Party.Cache.Updated = !0), !0;
		return !1;
	});
