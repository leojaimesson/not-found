export default (data) => ({
    content: [
        {
            text: `Relatório de coletas realizadas entre ${data.startDate} - ${data.endDate}\n\n`,
            style: 'header'
        },
        {
            text: `Total coletado: ${data.total} Kg`,
            fontSize: 14, bold: true
        },
        {
			style: 'table',
			table: {
                widths: [100, '*', 200],
				body: [
					['Data', 'Total coletado', 'Tipo de resíduo coletado'],
					...data.datas
				]
			}
		}
    ],

    styles: {
        header: {
            fontSize: 18,
            bold: true
        },
        table: {
			margin: [0, 5, 0, 15]
		},
    }
});