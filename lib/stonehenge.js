import $ from 'jquery';
import '@codecola/redactor/lib/redactor';
import '@codecola/redactor/lib/redactor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/mode/xml/xml';
import '@codecola/redactor/lib/plugins/codemirror';
import '@codecola/redactor/lib/plugins/definedlinks';
import '@codecola/redactor/lib/plugins/filemanager';
import '@codecola/redactor/lib/plugins/iconic2';
import '@codecola/redactor/lib/plugins/imagemanager';
import '@codecola/redactor/lib/plugins/table';
import '../assets/css/stonehenge.css';

$('[region]').each(function () {
	const $region = $(this).addClass('stonehenge-region');
	$region.wrapInner('<div></div>');
	const $content = $('> div', $region);

	const $icon = $('<i></i>').addClass('fa fa-pencil-square');
	const $button = $('<a></a>').addClass('stonehenge-edit').append($icon);

	$region.prepend($button);

	let editing = false;
	$button.click(() => {
		editing = !editing;

		if (editing) {
			$content.redactor({
				focus: true,
				plugins: ['codemirror', 'definedlinks', 'filemanager', 'iconic2', 'imagemanager', 'table'],
				codemirror: {
					lineNumbers: true,
					mode: 'xml',
					indentUnit: 2,
					theme: 'railscasts'
				}
			});
			$content.redactor('button.setIcon', $content.redactor('button.get', 'html'), '<i class="fa fa-code"></i>');
			$content.redactor('button.setIcon', $content.redactor('button.get', 'table'), '<i class="fa fa-table"></i>');

			$icon.removeClass('fa-pencil-square').addClass('fa-check-square');
		} else {
			if ($content.siblings('textarea.open').length) { $content.redactor('codemirror.hide'); }
			$content.redactor('core.destroy');

			$icon.removeClass('fa-check-square').addClass('fa-pencil-square');
		}
	});
});
