# users/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout,update_session_auth_hash
from django.contrib.auth.decorators import login_required
from .forms import ProfileForm, CustomUserForm, CustomPasswordChangeForm, CustomUserCreationForm
from django.shortcuts import render, redirect
from .forms import ProfileForm, CustomUserForm, CustomPasswordChangeForm
from .models import Profile

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            print("forms save initiated")
            user = form.save()
            print("save success")
            backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user, backend=backend)
            messages.success(request, "Registration successful.")
            return redirect('home')  # Ganti 'home' dengan halaman yang diinginkan setelah signup
        else:
            messages.error(request, "Registration failed. Please try again.")
    else:
        form = CustomUserCreationForm()
    return render(request, 'auth.html', {'form': form, 'page': 'signup'})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            print(user)
            if user is not None:
                login(request, user)
                print("login success")
                messages.success(request, f"Welcome back, {username}!")
                return redirect('home')  # Ubah 'home' sesuai dengan URL name dari halaman tujuan
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# Logout View
def logout_view(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect('login')  # Redirect ke halaman login setelah logout

def delete_account(request):
    user = request.user
    # Log the user out first
    logout(request)
    # Delete the user account
    user.delete()
    # Redirect to index page after deletion
    return redirect('index')

@login_required
def edit_profile_view(request):
    print("request:", request.method)
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        profile_form = ProfileForm(request.POST, request.FILES, instance=profile)
        user_form = CustomUserForm(request.POST, instance=request.user)
        password_form = CustomPasswordChangeForm(user=request.user, data=request.POST)

        print(f"user form: {user_form}")

        print(f"profile valid: {profile_form.is_valid()} and user valid: {user_form.is_valid()}")

        if profile_form.is_valid() and user_form.is_valid():
            profile_form.save()
            user_form.save()
            if password_form.is_valid():
                user = password_form.save()
                update_session_auth_hash(request, user)  # Keeps the user logged in after password change
            messages.success(request, 'Your profile has been updated successfully.')
            return redirect('view_profile')
    else:
        profile_form = ProfileForm(instance=profile)
        user_form = CustomUserForm(instance=request.user)
        password_form = CustomPasswordChangeForm(user=request.user)

    context = {
        'profile_form': profile_form,
        'user_form': user_form,
        'password_form': password_form
    }
    return render(request, 'edit_profile.html', context)

def home_view(request):
    return render(request, 'home.html')  # Pastikan 'home.html' ada di templates

@login_required
def view_profile_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    return render(request, 'view_profile.html', {'profile': profile})

# def edit_profile_view(request):
#     return render(request, 'edit_profile.html')

def learn_read_view(request):
    return render(request, 'learn_read.html')

def learn_listen_view(request):
    return render(request, 'learn_listen.html')

def index_view(request):
    return render(request, 'index.html')
