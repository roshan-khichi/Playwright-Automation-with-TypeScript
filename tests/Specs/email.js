const fs = require('node:fs');
const path = require('node:path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({
	path: path.resolve(__dirname, '../../.env'),
});

const reportPath = path.resolve(__dirname, '../../playwright-report/index.html');
const requiredEnvironmentVariables = [
	'SMTP_HOST',
	'SMTP_USER',
	'SMTP_PASSWORD',
	'MAIL_TO',
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
	(name) => !process.env[name],
);

if (missingEnvironmentVariables.length > 0) {
	console.error(
		`Missing required environment variables: ${missingEnvironmentVariables.join(', ')}`,
	);
	process.exit(1);
}

if (!fs.existsSync(reportPath)) {
	console.error(`Playwright report was not found at ${reportPath}`);
	process.exit(1);
}

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT || 587),
	secure: process.env.SMTP_SECURE === 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

async function sendReport() {
	const report = fs.readFileSync(reportPath, 'utf8');

	const message = await transporter.sendMail({
		from: process.env.MAIL_FROM || process.env.SMTP_USER,
		to: process.env.MAIL_TO,
		subject: process.env.MAIL_SUBJECT || 'Playwright test report',
		text: 'The latest Playwright test report is attached.',
		html: report,
		attachments: [
			{
				filename: 'playwright-report.html',
				path: reportPath,
				contentType: 'text/html',
			},
		],
	});

	console.log(`Email sent successfully: ${message.messageId}`);
}

sendReport().catch((error) => {
	console.error('Unable to send email:', error.message);
	process.exitCode = 1;
});
