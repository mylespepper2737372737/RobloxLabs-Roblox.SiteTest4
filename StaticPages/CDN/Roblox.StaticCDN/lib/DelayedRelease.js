var startingQuantitySelector = $('#TotalAvailable');
var limitedEditionSelector = $('#IsLimited');
var saleDeadlineSelector = $('#SaleDeadline');
var saleDeadlineToggleSelector = $('#OffSaleDeadlineToggle');
var isLimitedEdition = function () {
	return limitedEditionSelector.prop('checked');
};

$(function () {
	var minScale = $('#MarketingBoostPanel').data('mincale');
	var maxScale = $('#MarketingBoostPanel').data('maxscale');
	var currentValue = $('#BoostAmountScale').val();

	$('#slider').slider({
		value: currentValue,
		min: minScale,
		max: maxScale,
		step: 1,
		slide: function (event, ui) {
			$('#BoostAmountScale').val(ui.value);
		},
	});
	$('#BoostAmountScale').val($('#slider').slider('value'));
	$('#ReleaseDate').bind('blur keyup change', function () {
		var startDate = $(this).val();
		$('#BoostStartDate').val(startDate);
		$('#BoostEndDate').val('');
	});

	// Initial disable for limited Edition dependent fields
	if (!isLimitedEdition()) {
		startingQuantitySelector.prop('disabled', true);
		startingQuantitySelector.val(null);
	}

	// Limited checkbox change event
	limitedEditionSelector.change(function () {
		toggleAndClearOutDependentField(startingQuantitySelector, this.checked);
	});

	// Initial disable for Sale deadline dependent fields
	if (!isNullOrEmpty($(saleDeadlineSelector).val())) {
		$(saleDeadlineToggleSelector).prop('checked', true);
		$(saleDeadlineSelector).prop('disabled', false);
	}

	// Sale deadline checkbox change event
	$(saleDeadlineToggleSelector).change(function () {
		toggleAndClearOutDependentField(saleDeadlineSelector, this.checked);
	});

	function toggleAndClearOutDependentField(selector, isChecked) {
		selector.prop('disabled', !isChecked);

		if (!isChecked) {
			selector.val(null);
		}
	}
});

function isNullOrEmpty(value) {
	return value === null || value === undefined || value === '';
}

function assetValidation() {
	var warningText = '';
	var warningCount = 0;

	if (isLimitedEdition()) {
		var startingQuantity = $(startingQuantitySelector).val();
		var saleDeadLine = $(saleDeadlineSelector).val();

		if (isNullOrEmpty(startingQuantity) && isNullOrEmpty(saleDeadLine)) {
			warningCount++;
			warningText += '\n - The item is Limited, but both Starting Quantity and Sale Deadline are empty.';
		} else {
			if (!isNullOrEmpty(startingQuantity) && parseFloat(startingQuantity) <= 0) {
				warningCount++;
				warningText += '\n - The item is Limited, but Starting Quantity is less than or equal to zero.';
			}
			if (!isNullOrEmpty(saleDeadLine) && parseFloat(saleDeadLine) <= 0) {
				warningCount++;
				warningText += '\n - The item is Limited, but Sale Deadline is less than or equal to zero.';
			}
			if (!isNullOrEmpty(startingQuantity) && !isNullOrEmpty(saleDeadLine)) {
				warningCount++;
				warningText += '\n - The item is Limited, but both Sale Deadline and Starting Quantity have values.';
			}
		}
	}

	if (warningCount > 0) {
		warningText = 'You have ' + warningCount + ' warning(s): \n' + warningText + '\n \n Do you wish to save anyways?';
		var isWarningOverridden = confirm(warningText);
		if (isWarningOverridden) {
			return true;
		}
		return false;
	} else {
		return true;
	}
}
