import 'package:Melodify/ui/home.dart';
import 'package:Melodify/ui/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'signup.dart'; // Import the SignUpScreen widget file.


import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';


class EmailPasswordScreen extends StatefulWidget {
  @override
  _EmailPasswordScreenState createState() => _EmailPasswordScreenState();
}

class _EmailPasswordScreenState extends State<EmailPasswordScreen>
    with TickerProviderStateMixin {
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  late AnimationController _animationController;
  bool _showLogo = true;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 1500),
    );

    Future.delayed(Duration(seconds: 2), () {
      setState(() {
        _showLogo = false;
      });
      _animationController.forward();
    });
  }
  void _showErrorMessage(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Message'),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () {
                if (message == "Registered!") {
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) =>  Home()));

                } else {
                  Navigator.of(context).pop();
                }
              },
                child: Text(message == "Registered!" ? 'Login' : 'Close'),
            ),
          ],
        );
      },
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.blue, Colors.black38, Colors.blueGrey],
              ),
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Visibility(
                  visible: _showLogo,
                  child: Image.asset(
                    'assets/icons/ty.png', 
                    width: 500, 
                    height: 500,
                  ),
                ),
                SizedBox(
                    height:
                        20), 

                if (!_showLogo)
                  Container(
                    width: 300, 
                    child: TextField(
                      controller: _usernameController,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                SizedBox(height: 10),
                if (!_showLogo)
                  Container(
                    width: 300, 
                    child: TextField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                SizedBox(height: 10),
                if (!_showLogo)
                  TextButton(
                    onPressed: () async {
                    
                      try {
  final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
    email: _usernameController.text,
    password: _passwordController.text
  );
  if (credential.user != null) {
    _showErrorMessage('Login successful!');
  }
} on FirebaseAuthException catch (e) {
  if (e.code == 'INVALID_LOGIN_CREDENTIALS') {
    _showErrorMessage('username or password is wrong');
  } else if (e.code == 'wrong-password') {
    _showErrorMessage('Wrong password provided for that user.');
  }
}
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.black26,
                      primary: Colors.white,
                      padding: EdgeInsets.all(15),
                    ),
                    child: Text('Login'),
                  ),
                SizedBox(height: 10),
                if (!_showLogo)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/ForgotPassword');
                        },
                        child: Text(
                          'Forgot Password?',
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/signup');
                        },
                        child: Text('Sign up',
                            style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
}


