import { AnswerKey } from '../../quiz'

export type TransportProtocol = 'TCP' | 'UDP'
export type Port = number[]
export type PortAndProtocols = [port: Port, protocols: TransportProtocol[]]

export const portsAndProtocols = new AnswerKey<string, PortAndProtocols>([
	['DHCP', [[67, 68], ['UDP']]],
	['DHCPv6', [[547], ['UDP']]],
	['DNS', [[53], ['TCP', 'UDP']]],
	['Echo', [[7], ['TCP', 'UDP']]],
	['FTP', [[20, 21], ['TCP']]],
	['H.323', [[1720], ['TCP']]],
	['HTTP', [[80], ['TCP']]],
	['HTTPS', [[443], ['TCP']]],
	['IMAP', [[143], ['TCP']]],
	['IMAPS', [[993], ['TCP']]],
	['IRC', [[194], ['TCP']]],
	['Kerberos', [[88], ['TCP', 'UDP']]],
	['kpasswd (Kerberos password change)', [[464], ['TCP', 'UDP']]],
	['LDAP', [[389], ['TCP', 'UDP']]],
	['LDAPS', [[636], ['TCP']]],
	['NetBIOS', [[137, 138, 139], ['UDP']]],
	['NTP', [[123], ['UDP']]],
	['POP3', [[110], ['TCP']]],
	['POP3S', [[995], ['TCP']]], // POP3 Secure / POP3 over TLS
	['RADIUS (Remote Authentication Dial-In User Service)', [[1812, 1813], ['UDP']]], // (or 1645 / 1646) Provides centralized Authentication, Authorization, and Accounting (AAA) for network access (e.g., Wi-Fi or VPN logins). Note: RADIUS only encrypts the password, whereas TACACS+ encrypts the entire payload.
	['RDP', [[3389], ['TCP', 'UDP']]],
	['SIP', [[5060, 5061], ['TCP', 'UDP']]],
	['SMB', [[445], ['TCP']]],
	['SMSD', [[596], ['TCP']]],
	['SMTP', [[25], ['TCP']]], // aka Message Submission
	['SMTP with STARTTLS', [[587], ['TCP']]], // aka Message Submission. 465 legacy port
	['SNMP', [[161, 162], ['UDP']]],
	['SSH', [[22], ['TCP']]],
	['Syslog', [[514], ['UDP']]], // (TCP for secure) Standard port for sending system log messages. Syslog over plain UDP 514 is unencrypted.
	['Syslog over TLS ', [[6514], ['TCP']]], // The modern, encrypted version of Syslog used to securely ship event logs to a SIEM.
	['TACACS+ (Terminal Access Controller Access-Control System Plus) / Login Host Protocol', [[49], ['TCP']]], // Cisco's proprietary AAA protocol that encrypts the entire session, unlike RADIUS.
	['Telnet', [[23], ['TCP']]],
	['TFTP', [[69], ['UDP']]],
])


// 500 / 4500 | ISAKMP / IPsec / VPNs| UDP: Used when setting up secure Virtual Private Networks (VPNs). Port 500 handles the Internet Key Exchange (IKE) for security associations, while Port 4500 handles NAT traversal (UDP encapsulation).
// 1723 | PPTP (Point-to-Point Tunneling Protocol) | TCP & GRE: An older, legacy VPN tunneling protocol. Security status: Cryptographically broken and insecure. You should recognize it as something that needs to be replaced by IPsec or OpenVPN.
// 1194 | OpenVPN | TCP / UDP: A popular, highly secure open-source VPN protocol that typically uses TLS/SSL for key exchange.
// 8080 / 8443 | Alternative HTTP / HTTPS: Frequently used for web-based management consoles, proxy servers, or testing environments. If you see traffic on 8443, it's secure web traffic just like 443.
