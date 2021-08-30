// bundle: Pages___Messages___7afb4883b1b91a9bf20b44a3fcd3e5d3_m
// files: modules/Pages/Messages.js

// modules/Pages/Messages.js
Roblox.define('Pages.Messages', ['Widgets.AvatarImage', 'Resources.Messages'], function () {
	function nt() {
		return +new Date();
	}
	function r() {}
	function c(n) {
		for (var t = 0; t < e.length; t++) if (e[t].TabValue == n) return e[t].HashPart;
		return e[0].HashPart;
	}
	function kt(n) {
		var i, t;
		if (!isNaN(parseInt(n))) return n;
		if (n !== undefined && n.indexOf(ot) != -1) return (i = parseInt(n.substring(n.length - 1, n.length))), i - 1;
		for (t = 0; t < e.length; t++) if (e[t].HashPart == n) return e[t].TabValue;
		return e[0].TabValue;
	}
	function bt(n) {
		tt = !1;
		var r = History.getState().data,
			e = t == i.Inbox ? n : r.messagePage,
			o = t == i.Archive ? n : r.archivePage,
			u = t == i.Sent ? n : r.sentPage,
			f = t == i.Announcements ? n : r.notificationsPage;
		History.pushState({ archivePage: o, messagePage: e, sentPage: u, notificationsPage: f, tab: t }, ct, '?' + t);
	}
	function st() {
		t == undefined && (t = i.Inbox);
		var n = History.getState().data;
		if (
			n.tab != undefined &&
			n.messagePage != undefined &&
			n.archivePage != undefined &&
			n.sentPage != undefined &&
			n.notificationsPage != undefined
		) {
			k(n);
			return;
		}
		(h = !0),
			History.replaceState(
				{ archivePage: 1, messagePage: 1, sentPage: 1, notificationsPage: 1, tab: t },
				'ROBLOX - ' + Resources.Messages.messages,
				'?' + c(t),
			),
			t == i.Inbox
				? s(Roblox.MessagesPager, Roblox.MessagesPager.startIndex, -1)
				: t == i.Archive
				? s(Roblox.ArchivedPager, Roblox.ArchivedPager.startIndex, -1)
				: t == i.Sent
				? s(Roblox.SentPager, Roblox.SentPager.startIndex, -1)
				: t == i.Notifications || t == i.Announcements
				? s(Roblox.NotificationsPager, Roblox.NotificationsPager.startIndex, -1)
				: Roblox.Widgets.AvatarImage.populate();
	}
	function vt(n, i, u, f, e, s) {
		(t = kt(s)), $('#MessagesTabs').children().eq(t).click(), (y = !0), (o = n), (v = $('#ie7').length != 0);
		var h = { Paging_PageNumbers_AreLinks: !1, FetchItemsOnLoad: !1, pagingClickFunction: bt };
		(Roblox.MessagesPager = new DataPager(i, o, 'MessagesInbox', 'pagingInbox', r, r, r, h)),
			(Roblox.ArchivedPager = new DataPager(u, o, 'MessagesArchived', 'pagingArchived', r, r, r, h)),
			(Roblox.SentPager = new DataPager(f, o, 'MessagesSent', 'pagingSent', r, r, r, h)),
			(Roblox.NotificationsPager = new DataPager(e, o, 'MessagesSystem', 'pagingSystem', r, r, r, h)),
			(window.onpageshow = function (n) {
				n.persisted && window.location.reload();
			}),
			st();
	}
	function yt(n) {
		n
			? ($('#sent-general-buttons').hide(),
			  $('#sent-detail-buttons').show(),
			  $('#MessagesDetailSent').show(),
			  $('#MessagesSent').hide())
			: ($('#sent-general-buttons').show(),
			  $('#sent-detail-buttons').hide(),
			  $('#MessagesDetailSent').hide(),
			  $('#MessagesSent').show());
	}
	function lt(n) {
		n
			? ($('#system-general-buttons').hide(),
			  $('#system-detail-buttons').show(),
			  $('#MessagesDetailSystem').show(),
			  $('#MessagesSystem').hide())
			: ($('#system-general-buttons').show(),
			  $('#system-detail-buttons').hide(),
			  $('#MessagesDetailSystem').hide(),
			  $('#MessagesSystem').show());
	}
	function at(n) {
		n
			? ($('#inbox-general-buttons').hide(),
			  $('#inbox-detail-buttons').show(),
			  $('#MessagesDetailInbox').show(),
			  $('#MessagesInbox').hide())
			: ($('#inbox-general-buttons').show(),
			  $('#inbox-detail-buttons').hide(),
			  $('#MessagesDetailInbox').hide(),
			  $('#MessagesInbox').show());
	}
	function pt(n) {
		n
			? ($('#archive-general-buttons').hide(),
			  $('#archive-detail-buttons').show(),
			  $('#MessagesDetailArchive').show(),
			  $('#MessagesArchived').hide())
			: ($('#MessagesDetailArchive').hide(),
			  $('#archive-general-buttons').show(),
			  $('#archive-detail-buttons').hide(),
			  $('#MessagesArchived').show());
	}
	function a(n, t) {
		switch (n) {
			case i.Archive:
				pt(t);
				break;
			case i.Inbox:
				at(t);
				break;
			case i.Sent:
				yt(t);
				break;
			case i.Notifications:
			case i.Announcements:
				lt(t);
		}
	}
	function dt(n, t) {
		var r = null;
		switch (n) {
			case i.Notifications:
				r = { Pager: Roblox.NotificationsPager, PageNumber: t.notificationsPage };
				break;
			case i.Archive:
				r = { Pager: Roblox.ArchivedPager, PageNumber: t.archivePage };
				break;
			case i.Sent:
				r = { Pager: Roblox.SentPager, PageNumber: t.sentPage };
				break;
			case i.Inbox:
				r = { Pager: Roblox.MessagesPager, PageNumber: t.messagePage };
		}
		return r;
	}
	function wt(n) {
		var t = $(n),
			r = t.parent(),
			i = r.next().children().eq(t.index());
		$.each([t, i], function (n, t) {
			t.addClass('tab-active').siblings().removeClass('tab-active');
		});
	}
	function k(n) {
		var u, c;
		if (h) {
			h = !1;
			return;
		}
		if (
			((u = t),
			a(u, !1),
			(u = n.tab),
			(c = $('#MessagesTabs').children().eq(u)),
			wt(c),
			l ? (y = !0) : v && (l = !0),
			v || (l = !0),
			u != i.Announcements)
		) {
			var o = dt(u, n),
				r = o.Pager,
				f = o.PageNumber,
				e = r.totalItems;
			r !== undefined && (r.callUpdatePager(e, f), (r.totalItems = e), (f = r.getCurrentPage())), s(r, (f - 1) * 20 + 1, e);
		}
	}
	function s(n, i) {
		i < 0 && (i = 0);
		var u = '/getmessages',
			r = { tab: t, startIndex: i ? i - 1 : 0, maxRows: o, cacheBuster: nt() };
		$.ajax({
			type: 'POST',
			data: r,
			url: u,
			dataType: 'html',
			success: function (t) {
				p(n, t);
			},
			error: function () {
				n.itemContainerDiv.html(g);
			},
		});
	}
	function d(n) {
		switch (n) {
			case i.Archive:
				return '#MessagesDetailArchive';
			case i.Sent:
				return '#MessagesDetailSent';
			case i.Notifications:
				return '#MessagesDetailSystem';
			default:
				return '#MessagesDetailInbox';
		}
	}
	function ut(n) {
		switch (n) {
			case i.Archive:
				return '#MessagesArchived';
			case i.Sent:
				return '#MessagesSent';
			case i.Notifications:
				return '#MessagesSystem';
			default:
				return '#MessagesInbox';
		}
	}
	function rt(n, i) {
		$('a.roblox-replyToMessage').removeClass('disabled');
		var u = '/message/' + n,
			r = d(i);
		$(r).load(u, function (r, u) {
			if (u != 'error') {
				a(i, !0);
				var e = History.getState().data;
				(h = !0),
					History.pushState(
						{
							archivePage: e.archivePage || 1,
							messagePage: e.messagePage || 1,
							sentPage: e.sentPage || 1,
							tab: t,
							messageId: n,
						},
						'ROBLOX - ' + Resources.Messages.messages,
						'?' + c(t),
					);
			}
		});
		return;
	}
	function it(n) {
		var u = d(n),
			r = ut(n),
			i,
			t;
		a(n, !1),
			$(u).hide(),
			$(r).show(),
			(i = History.getState().data),
			(t = 'div[data-messageid=' + i.messageId + '].messageDivider'),
			$(t).removeClass('unread'),
			$(t).addClass('read');
	}
	function et(n) {
		switch (n) {
			case i.Inbox:
				return w;
			case i.Archive:
				return b;
			case i.Notifications:
				return ht;
		}
		return '';
	}
	function u(n, r, u) {
		var h = '/messages/changeMessageStatus?',
			f = r.getStartIndex() - 1,
			l;
		if (u) h += 'messageIds=' + u;
		else {
			var a = et(t),
				s = $(a + ':checked'),
				v = t == $(a);
			if (s.length == 0) return !1;
			if (t != i.Notifications && (n == 0 || n == 1) && v.length == s.length && r.isLastPage() && f != 0) {
				f = f - o;
				var e = History.getState().data,
					w = t != i.Inbox ? e.archivePage : e.archivePage - 1,
					y = t != i.Inbox ? e.messagePage : e.messagePage - 1;
				History.replaceState(
					{ archivePage: w || 1, messagePage: y || 1, tab: t },
					'ROBLOX - ' + Resources.Messages.messages,
					'?' + c(t),
				);
			}
			s.each(function () {
				var n = $(this).data('messageid');
				h += 'messageIds=' + n + '&';
			});
		}
		(l = { actionType: n, tab: t, startIndex: f, maxRows: o, cacheBuster: nt() }),
			$.ajax({
				type: 'POST',
				data: l,
				url: h,
				dataType: 'html',
				success: function (n) {
					p(r, n);
				},
				error: function () {
					r.itemContainerDiv.html(g);
				},
			});
	}
	function p(n, r) {
		var e, f, o, u;
		if (
			(a(t),
			n.updateHtml(r),
			(e = $('#tab' + t + 'resultsTotal').val()),
			n.callUpdatePager(e),
			(n.totalItems = e),
			(f = [
				['.roblox-archiveButton', '.roblox-markAsReadInbox', '.roblox-markAsUnreadInbox'],
				[],
				['.roblox-moveToInboxButton', '.roblox-markAsReadArchive', '.roblox-markAsUnreadArchive'],
				[],
			]),
			(o = t == i.Inbox ? '.roblox-archiveAll' : '.roblox-moveAllToInbox'),
			$(o).prop('checked', !1),
			e == 0)
		) {
			for (u = 0; u < f[t].length; u++) $(f[t][u]).addClass('disabled');
			$(o).prop('disabled', !0), n.itemContainerDiv.html(ft);
		} else {
			for (u = 0; u < f[t].length; u++) $(f[t][u]).removeClass('disabled');
			$(o).prop('disabled', !1);
		}
		Roblox.Widgets.AvatarImage.populate();
	}
	var i = { Inbox: 0, Sent: 1, Notifications: 4, Archive: 3, Announcements: 2 },
		e = [
			{ HashPart: 'inbox', TabValue: i.Inbox },
			{ HashPart: 'sent', TabValue: i.Sent },
			{ HashPart: 'notifications', TabValue: i.Notifications },
			{ HashPart: 'archive', TabValue: i.Archive },
			{ HashPart: 'announcements', TabValue: i.Announcements },
		],
		f = { MarkArchived: 0, MarkUnarchived: 1, MarkAsRead: 2, MarkAsUnread: 3, Delete: 4 },
		ot = 'tabs-',
		y = !1,
		o,
		v,
		l = !0,
		g = "<span class='singleMessage'>" + Resources.Messages.sorry + '</span>',
		ft = "<span class='singleMessage'>" + Resources.Messages.noMessages + '</span>',
		ct = 'ROBLOX - Messages',
		h = !1,
		t = 0,
		tt = !1;
	$('#MessagesTabs').on('tabsactivate', function (n, r) {
		if (y) {
			var f = History.getState().data,
				u = r.newTab.data('name');
			u == 'Sent' && (t = i.Sent),
				u == 'Notifications' && (t = i.Notifications),
				u == 'Inbox' && (t = i.Inbox),
				u == 'Archive' && (t = i.Archive),
				u == 'Announcements' && (t = i.Announcements),
				(tt = !0),
				(l = !1),
				History.pushState(
					{
						archivePage: f.archivePage || 1,
						messagePage: f.messagePage || 1,
						sentPage: f.sentPage || 1,
						notificationsPage: f.notificationsPage || 1,
						tab: t,
					},
					'ROBLOX - ' + Resources.Messages.messages,
					'?' + c(t),
				);
		}
	});
	var w = '.roblox-inboxCheckbox input[type=checkbox]',
		b = '.roblox-archiveCheckbox input[type=checkbox]',
		ht = '.roblox-systemCheckbox input[type=checkbox]';
	return (
		$('.roblox-archiveAll').click(function () {
			$(w).prop('checked', this.checked);
		}),
		$('.roblox-moveAllToInbox').click(function () {
			$(b).prop('checked', this.checked);
		}),
		$('.roblox-markAsReadInbox').click(function () {
			u(f.MarkAsRead, Roblox.MessagesPager);
		}),
		$('.roblox-markAsUnreadInbox').click(function () {
			u(f.MarkAsUnread, Roblox.MessagesPager);
		}),
		$('.roblox-markAsReadSystem').click(function () {
			u(f.MarkAsRead, Roblox.NotificationsPager);
		}),
		$('.roblox-markAsUnreadSystem').click(function () {
			u(f.MarkAsUnread, Roblox.NotificationsPager);
		}),
		$('.roblox-deleteButtonSystem').click(function () {
			u(f.MarkArchived, Roblox.NotificationsPager);
		}),
		$('.roblox-markAsReadArchive').click(function () {
			u(f.MarkAsRead, Roblox.ArchivedPager);
		}),
		$('.roblox-markAsUnreadArchive').click(function () {
			u(f.MarkAsUnread, Roblox.ArchivedPager);
		}),
		$('.roblox-moveToInboxButton').click(function () {
			u(f.MarkUnarchived, Roblox.ArchivedPager);
		}),
		$('.roblox-archiveButton').click(function () {
			u(f.MarkArchived, Roblox.MessagesPager);
		}),
		$('.roblox-archiveMessage').click(function () {
			var n = History.getState().data;
			u(f.MarkArchived, Roblox.MessagesPager, n.messageId);
		}),
		$('.roblox-moveToInboxMessage').click(function () {
			var n = History.getState().data;
			u(f.MarkUnarchived, Roblox.ArchivedPager, n.messageId);
		}),
		$('.roblox-deleteMessage').click(function () {
			var t = History.getState().data,
				n = $(this).hasClass('roblox-archived') ? Roblox.ArchivedPager : Roblox.MessagesPager;
			u(f.Delete, n, t.messageId);
		}),
		$('.roblox-replyToMessage').click(function () {
			$(this).hasClass('disabled') || ($('.message-reply').show(), $('.messages-reply-box').focus(), $(this).addClass('disabled'));
		}),
		$('.roblox-messageback').click(function () {
			var n = History.getState().data;
			return it(n.tab), !1;
		}),
		$('.roblox-sendMessage').click(function () {
			var n = $(this).data('messageid'),
				i = $('.messages-reply-box[data-messageid=' + n + ']').val(),
				t = { body: i, inReplyToMessageId: n };
			$.ajax({ type: 'POST', data: t, url: url, dataType: 'html' });
		}),
		$('.roblox-notificationRow').click(function () {
			var n = $(this).data('messageid'),
				i = $('.roblox-notificationMessage-' + n),
				t = i.css('display') != 'none';
			t ? $('.roblox-notificationMessage-' + n).slideUp('fast') : $('.roblox-notificationMessage-' + n).slideDown('fast');
		}),
		{ init: vt, loadState: k, loadMessage: rt }
	);
});
