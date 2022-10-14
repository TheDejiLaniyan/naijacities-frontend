import NotificationProvider from 'use-toast-notification'

const CustomToastContainer = () =>{
    return (
        <NotificationProvider
			config={{
				position: 'top-right',
				isCloseable: false,
				showTitle: true,
				showIcon: true,
				duration: 5,
			}}
		>
        </NotificationProvider>
    )
}


export default CustomToastContainer