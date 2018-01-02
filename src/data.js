var config = 
    {
        leafID: '1',
        title: 'decision 1',
        text: 'this is decision 1',
        children: [
            {
                choice: 'this is choice 1 for decision 1',
                leafID: '1d1',
                title: 'decision 1d1',
                text: 'this is decision 1d1',
                children: [
                    {
                        choice: 'this is choice 1 for decision 1d1',
                        leafID: '1d1d1',
                        title: 'decision 1d1d1',
                        text: 'this is decision 1d1d1',
                        children: [
                            {
                                end: true,
                                choice: 'go to google',
                                action: 'http://google.com'
                            },
                            {
                                choice: 'this is choice 1 for decision 1d1d1',
                                leafID: '1d1d1d1',
                                title: 'decision 1d1d1d2',
                                text: 'this is decision 1d1d1d2',
                                children: [
                                    {
                                        end: true,
                                        choice: 'go to google',
                                        action: 'http://google.com'
                                    }
                                ]
                
                            },
                            {
                                choice: 'this is choice 2 for decision 1d1d1',
                                leafID: '1d1d2d1',
                                title: 'decision 1d1d2d1',
                                text: 'this is decision 1d1d2d1',
                                children: [
                                    {
                                        end: true,
                                        choice: 'go to bing',
                                        action: 'http://bing.com'
                                    }
                                ]
                
                            }
                        ]
        
                    },
                    {
                        choice: 'this is choice 2 for decision 1d1',
                        leafID: '1d1d2',
                        title: 'decision 1d1d2',
                        text: 'this is decision 1d1d2',
                        children: [
                            {
                                end: true,
                                choice: 'go to bing',
                                action: 'http://bing.com'
                            }
                        ]
        
                    }
                ]

            },
            {
                choice: 'this is choice 2 for decision 1',
                leafID: '1d2',
                title: 'decision 1d2',
                text: 'this is decision 1d2',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            },
            {
                choice: 'this is choice 3 for decision 1',
                leafID: '1d3',
                title: 'decision 1d3',
                text: 'this is decision 1d3',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            },
            {
                choice: 'this is choice 4 for decision 1',
                leafID: '1d4',
                title: 'decision 1d4',
                text: 'this is decision 1d4',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            }
        ]
    };